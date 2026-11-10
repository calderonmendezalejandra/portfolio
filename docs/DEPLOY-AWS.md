# Publicar el portfolio en AWS (S3 + CloudFront + GitHub Actions)

Guía para hacerlo tú misma desde la consola de AWS. Calcula una hora la primera vez.

**Qué vas a montar**

```
git push ──► GitHub Actions ──(OIDC, sin claves)──► S3 (bucket privado) ──► CloudFront (HTTPS, CDN) ──► visitantes
```

- **S3** guarda los archivos. El bucket es **privado**: nadie entra directamente.
- **CloudFront** sirve la web por HTTPS desde servidores de todo el mundo y es lo único que puede leer el bucket (Origin Access Control).
- **GitHub Actions** sube los cambios automáticamente cada vez que haces `git push` a `main`.
- **OIDC** permite que GitHub asuma un rol de IAM temporal, así que no hay claves de acceso guardadas en ningún sitio.

> Antes de empezar, en **Billing → Budgets** crea un presupuesto de 1 $ con aviso por correo. Es una buena costumbre en cualquier cuenta de AWS.

---

## 0. Sube el código a GitHub

1. Crea un repositorio nuevo en GitHub, por ejemplo `portfolio` (puede ser público).
2. En la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Portfolio v2"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/portfolio.git
git push -u origin main
```

El workflow fallará en este primer push porque AWS aún no está configurado. Es normal; lo volverás a lanzar en el paso 5.

---

## 1. Bucket de S3

1. Consola → **S3** → **Create bucket**.
2. **Bucket name:** algo único, p. ej. `alejandra-calderon-portfolio`.
3. **Region:** la que prefieras, p. ej. `eu-south-2` (España). Apúntala.
4. **Block all public access:** déjalo **activado**. CloudFront accederá con permisos propios.
5. Lo demás por defecto → **Create bucket**.

No hace falta activar "Static website hosting": con CloudFront y OAC no se usa.

---

## 2. Distribución de CloudFront

1. Consola → **CloudFront** → **Create distribution**.
2. Si te pide elegir **plan de precios**, elige **Free** ($0/mes, sin cargos por exceso; sobra para un portfolio). Si no aparece esa opción (las cuentas de AWS Free Tier no pueden usar los planes de tarifa plana), sigue con pago por uso: con el tráfico de un portfolio el coste es de céntimos y CloudFront tiene una capa gratuita propia.
3. **Origin:** elige tu bucket de S3 de la lista (el dominio `…s3.eu-south-2.amazonaws.com`, **no** el de "website").
4. **Origin access:** **Origin access control settings (recommended)** → crea un OAC nuevo con los valores por defecto. Si aparece la opción de que CloudFront actualice la política del bucket automáticamente, márcala.
5. **Viewer protocol policy:** **Redirect HTTP to HTTPS**.
6. **Default root object:** `index.html`.
7. **WAF:** para un portfolio no hace falta (en el plan Free viene incluido).
8. **Create distribution.** Tarda unos minutos en desplegarse.

**Política del bucket** (si no se aplicó sola): CloudFront muestra un aviso con **Copy policy**. Cópiala, ve a S3 → tu bucket → **Permissions → Bucket policy → Edit**, pégala y guarda. Tiene esta forma:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowCloudFrontServicePrincipal",
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::alejandra-calderon-portfolio/*",
    "Condition": { "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::ID_DE_TU_CUENTA:distribution/ID_DE_LA_DISTRIBUCION"
    }}
  }]
}
```

Apunta el **Distribution ID** (p. ej. `E1ABCDEF23GHIJ`) y el **Distribution domain name** (p. ej. `d1234abcd.cloudfront.net`). Este último es la URL de tu web.

---

## 3. Conectar GitHub con AWS (OIDC)

### 3a. Proveedor de identidad (una vez por cuenta)

Consola → **IAM** → **Identity providers** → **Add provider**:

- **Provider type:** OpenID Connect
- **Provider URL:** `https://token.actions.githubusercontent.com`
- **Audience:** `sts.amazonaws.com`

### 3b. Rol para el despliegue

IAM → **Roles** → **Create role** → **Web identity**:

- **Identity provider:** `token.actions.githubusercontent.com`
- **Audience:** `sts.amazonaws.com`
- **GitHub organization:** tu usuario de GitHub
- **GitHub repository:** `portfolio`
- **GitHub branch:** `main`

Sin políticas por ahora → nombre `github-portfolio-deploy` → **Create role**.

Abre el rol → **Trust relationships** y comprueba que la condición limita el acceso a tu repositorio y rama:

```json
"Condition": {
  "StringEquals": {
    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
    "token.actions.githubusercontent.com:sub": "repo:TU_USUARIO/portfolio:ref:refs/heads/main"
  }
}
```

### 3c. Permisos mínimos

En el rol → **Add permissions → Create inline policy → JSON**. Cambia el nombre del bucket, el ID de tu cuenta y el de la distribución:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    { "Sid": "ListBucket", "Effect": "Allow",
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::alejandra-calderon-portfolio" },
    { "Sid": "WriteObjects", "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject"],
      "Resource": "arn:aws:s3:::alejandra-calderon-portfolio/*" },
    { "Sid": "Invalidate", "Effect": "Allow",
      "Action": "cloudfront:CreateInvalidation",
      "Resource": "arn:aws:cloudfront::ID_DE_TU_CUENTA:distribution/ID_DE_LA_DISTRIBUCION" }
  ]
}
```

Nombre: `portfolio-deploy` → **Create policy**. Copia el **ARN del rol** (p. ej. `arn:aws:iam::123456789012:role/github-portfolio-deploy`).

Es el principio de mínimo privilegio: el rol solo puede escribir en ese bucket e invalidar esa distribución.

---

## 4. Configurar el repositorio de GitHub

En GitHub → tu repo → **Settings → Secrets and variables → Actions**:

**Secrets** (pestaña *Secrets*):

| Nombre | Valor |
|---|---|
| `AWS_ROLE_ARN` | el ARN del rol del paso 3c |

**Variables** (pestaña *Variables*):

| Nombre | Valor |
|---|---|
| `AWS_REGION` | p. ej. `eu-south-2` |
| `S3_BUCKET` | `alejandra-calderon-portfolio` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1ABCDEF23GHIJ` |

---

## 5. Primer despliegue

GitHub → **Actions** → **Deploy to AWS** → **Run workflow** (o haz cualquier cambio y `git push`).

Cuando termine en verde, abre `https://d1234abcd.cloudfront.net`. A partir de aquí, cada `git push` a `main` publica los cambios en uno o dos minutos.

**Si algo falla**

- *Not authorized to perform sts:AssumeRoleWithWebIdentity*: la condición `sub` del paso 3b no coincide con tu usuario, repo o rama (ojo con mayúsculas).
- *AccessDenied* al subir: revisa el nombre del bucket en la política del paso 3c y en la variable `S3_BUCKET`.
- *La web da 403 / AccessDenied*: falta la política del bucket del paso 2, o el *Default root object* no es `index.html`.
- *No veo los cambios*: espera a que termine la invalidación (CloudFront → Invalidations) y recarga con Ctrl + F5.

---

## 6. Opcional: dominio propio

1. Registra un dominio en **Route 53** (o donde prefieras).
2. En **Certificate Manager**, región **us-east-1 (N. Virginia)**, pide un certificado público para `tudominio.com` y `www.tudominio.com`, con validación DNS.
3. En la distribución → **Edit** → **Alternate domain names** + el certificado.
4. En Route 53, crea registros **A / AAAA (Alias)** que apunten a la distribución.

---

## Qué contar en una entrevista

> "Mi portfolio está en un bucket S3 privado servido por CloudFront con Origin Access Control y HTTPS. Lo despliego con GitHub Actions, que se autentica en AWS por OIDC con un rol de IAM de mínimo privilegio, sin claves guardadas. Cada push sincroniza los archivos con cabeceras de caché distintas para HTML y recursos, e invalida CloudFront."

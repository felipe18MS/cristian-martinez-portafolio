$image = "ghcr.io/felipe18ms/cristian-portfolio:latest"
$container = "cristian-portfolio"

Write-Host "Descargando imagen desde GHCR..."
docker pull $image

Write-Host "Deteniendo contenedor anterior..."
docker stop $container 2>$null

Write-Host "Eliminando contenedor anterior..."
docker rm $container 2>$null

Write-Host "Creando nuevo contenedor..."
docker run -d `
  --name $container `
  -p 8080:80 `
  $image

Write-Host "Deployment completado."

docker ps
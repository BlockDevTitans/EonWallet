cd api
dotnet publish -r win10-x64 --output bin/dist/win
:: dotnet publish -r linux-x64 --output bin/dist/linux
:: dotnet publish -r osx.10.11-x64 --output bin/dist/mac

cd ..\eonwallet-app-src
npm run electron:windows
:: npm run electron:linux
:: npm run electron:mac
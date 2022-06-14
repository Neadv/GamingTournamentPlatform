FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY src/GamingTournamentPlatform.Application/GamingTournamentPlatform.Application.csproj ./src/GamingTournamentPlatform.Application/
COPY src/GamingTournamentPlatform.Domain/GamingTournamentPlatform.Domain.csproj ./src/GamingTournamentPlatform.Domain/
COPY src/GamingTournamentPlatform.Infrastructure/GamingTournamentPlatform.Infrastructure.csproj ./src/GamingTournamentPlatform.Infrastructure/
COPY src/GamingTournamentPlatform.Web/GamingTournamentPlatform.Web.csproj ./src/GamingTournamentPlatform.Web/
RUN dotnet restore

# copy everything else and build app
COPY . .
RUN dotnet publish -c release -o /app

# build react-app
FROM node:current-alpine as react-build

WORKDIR /source
COPY /src/GamingTournamentPlatform.UI/package*.json ./
RUN npm i

COPY /src/GamingTournamentPlatform.UI/ .
RUN npm run build

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 as release
WORKDIR /app
COPY --from=build /app ./
COPY --from=react-build /source/build/ ./ClientApp/dist

EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT [ "dotnet", "GamingTournamentPlatform.Web.dll" ]
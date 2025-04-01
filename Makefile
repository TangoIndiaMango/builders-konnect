start-main:
	nx serve main-app

start-admin:
	nx serve admin-app

start-api:
	nx serve api

build-main:
	nx run main-app:build --verbose

build-admin:
	nx run admin-app:build --verbose


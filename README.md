# Scheduling_App

This Scheduling App was built using 2 frameworks. React for frontend UI/UX interaction, and Django as a backend API.

## Prerequisities

Homebrew 2.2.2

## Setup Requirements:

Python3 version - 3.7.6
Pip3 - 19.3.1
The following command will install both packages above.

```bash
brew install python
```

Node - v11.4.0
The following command will install above node.js.

```bash
brew install node
```

## Django Environment Setup

pipenv version - 2018.11.26
Install and create new virtual environment by running the following commands.

```bash
pip3 install pipenv
```

```bash
pipenv shell 
```

## Installing dependencies

To install required dependencies run the following command.

```bash 
pip3 install -r requirements.txt
```

## DB Migration

Run the following command to migrate DB with Django models.

```bash 
python manage.py migrate
```

## Start Server 

Run the following command to start server.

```bash
python manage.py runserver
```

pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git 'https://github.com/VootlaSaiCharan/dynamic_application.git'
            }
        }
        stage('Run Docker Compose') {
            steps {
                script{
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
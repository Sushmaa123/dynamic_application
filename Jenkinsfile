pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: 'feature', url: 'https://github.com/VootlaSaiCharan/dynamic_application.git'
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
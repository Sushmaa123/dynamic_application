pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git 'https://github.com/Sushmaa123/dynamic_application'
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

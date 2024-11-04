pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // This declares the NodeJS tool
    }

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage("Test") {
            steps {
                // sh "/usr/local/bin/npm install"  // Full path for Mac
                sh "npm install"
                sh "npm test"
            }
        }

        stage("Build") {
            steps {
                sh "npm run build"
            }
        }
    }
}
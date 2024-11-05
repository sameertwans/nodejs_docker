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

      stage('Install Dependencies') {
        steps {
          script {
            try {
              // sh "/usr/local/bin/npm install"  // Full path for Mac
              sh 'npm install'
            } catch (Exception e) {
              echo "Error installing dependencies: ${e}"
            }
          }
        }
      }

      stage('Test') {
        steps {
          sh 'npm test'
        }
      }

      stage('Build') {
        steps {
          sh 'npm run build'
        }
      }
    }
}

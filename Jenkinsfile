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
          sh 'npm install'
        }
      }
    }
  }
}

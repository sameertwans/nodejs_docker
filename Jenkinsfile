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

    stage('Test') {
      steps {
        script {
          sh 'npm test'
        }
      }
    }

    stage('Build') {
      steps {
        script {
          sh 'npm run build'
        }
      }
    }
  }
}

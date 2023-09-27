pipeline {
  agent {
    kubernetes {
      inheritFrom 'nodejs base'
      containerTemplate {
        name 'nodejs'
        image 'node:14.19.0'
      }

    }

  }
  stages {
    stage('Clone repository') {
      agent none
      steps {
        git(url: 'https://github.com/MingyiLi-USYD/AnimalCare-Frontend-V2.git', credentialsId: 'username-token', branch: 'main', changelog: true, poll: false)
      }
    }

    stage('Run npm install') {
      agent none
      steps {
        container('nodejs') {
          sh 'npm install'
        }

      }
    }

    stage('Run test') {
      agent none
      steps {
        container('nodejs') {
          sh 'npm run test'
        }

      }
    }

    stage('Run build') {
      steps {
        container('nodejs') {
          sh 'npm run build'
        }

      }
    }

    stage('Archive artifacts') {
      agent none
      steps {
        container('base') {
       withCredentials([usernamePassword(credentialsId: 'docker-io-registry', usernameVariable: 'DOCKER_USER_VAR', passwordVariable: 'DOCKER_PWD_VAR')]) {
                                sh 'docker build -t petbook-frontend:latest . '
                                sh 'echo "$DOCKER_PWD_VAR" | docker login $REGISTRY -u "$DOCKER_USER_VAR" --password-stdin'
                                sh 'docker tag petbook-frontend:latest $REGISTRY/$DOCKERHUB_NAMESPACE/petbook-frontend:latest'
                                sh 'docker push $REGISTRY/$DOCKERHUB_NAMESPACE/petbook-frontend:latest'
                            }

        }

      }
    }

  }

   environment {
          DOCKER_CREDENTIAL_ID = 'dockerhub-id'
          GITHUB_CREDENTIAL_ID = 'github-id'
          KUBECONFIG_CREDENTIAL_ID = 'demo-kubeconfig'
          REGISTRY = 'docker.io'
          DOCKERHUB_NAMESPACE = 'mingyiusyd'
          GITHUB_ACCOUNT = 'kubesphere'
          APP_NAME = 'devops-java-sample'
      }
}
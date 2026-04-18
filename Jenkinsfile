pipeline {
    agent any

    environment {
        DOCKER_USER = "fercdevv"
        DOCKER_BACKEND_IMAGE = "${DOCKER_USER}/node-api-sql:latest"
        DOCKER_FRONTEND_IMAGE = "${DOCKER_USER}/frontend-html:latest"
    }

    options {
        timeout(time: 5, unit: 'MINUTES')
    }
    
    stages {
        stage('build & push backend') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        dir('node-api-sql') {
                            def backendImage = docker.build("${DOCKER_BACKEND_IMAGE}")
                            backendImage.push()
                        }
                    }
                }
            }
        }

        stage('build & push frontend') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        dir('frontend') {
                            def frontendImage = docker.build("${DOCKER_FRONTEND_IMAGE}")
                            frontendImage.push()
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                def html = readFile('/var/jenkins_home/email-templates/build-template.html')

                html = html.replace('${projectName}', env.JOB_NAME)
                html = html.replace('${buildNumber}', env.BUILD_NUMBER)
                html = html.replace('${buildStatus}', currentBuild.currentResult)
                html = html.replace('${buildUrl}', env.BUILD_URL)


                 emailext(
                    from: 'lcruzfarfan@gmail.com',
                    to: 'lcruzfarfan@gmail.com',
                    subject: "Resultado del build",
                    mimeType: 'text/html',
                    body: html
                )
            }           
        }
    }
}
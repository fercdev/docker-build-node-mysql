def sendBuildEmail() {
    def html = readFile('/var/jenkins_home/email-templates/build-template.html')
    def startedBy = currentBuild.getBuildCauses()[0]?.shortDescription ?: 'Sistema'
    def duration = currentBuild.durationString.replace(' and counting', '')
    def timestamp = new Date().format('dd/MM/yyyy HH:mm:ss')

    // Información básica del build
    html = html.replace('${projectName}', env.JOB_NAME ?: 'N/A')
    html = html.replace('${buildNumber}', env.BUILD_NUMBER ?: 'N/A')
    html = html.replace('${buildStatus}', currentBuild.currentResult ?: 'UNKNOWN')
    html = html.replace('${buildUrl}', env.BUILD_URL ?: 'N/A')
    
    // Información de Git
    html = html.replace('${branchName}', env.GIT_BRANCH ?: env.BRANCH_NAME ?: 'N/A')
    html = html.replace('${startedBy}', startedBy)
    html = html.replace('${buildDuration}', duration)
    html = html.replace('${timestamp}', timestamp)
    html = html.replace('${currentYear}', new Date().format('yyyy'))
    
    // Información de commits
    html = html.replace('${lastCommit}', env.GIT_COMMIT?.take(8) ?: 'N/A')
    html = html.replace('${commitAuthor}', env.GIT_AUTHOR_NAME ?: env.GIT_COMMITTER_NAME ?: 'N/A')
    html = html.replace('${commitMessage}', env.GIT_COMMIT_MESSAGE ?: 'No disponible')

    emailext(
        from: 'lcruzfarfan@gmail.com',
        to: 'lcruzfarfan@gmail.com',
        subject: "Build ${currentBuild.currentResult}: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
        mimeType: 'text/html',
        body: html
    )
}

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
                sendBuildEmail()
            }           
        }
        
        failure {
            script {
                sendBuildEmail()
            }
        }
    }
}
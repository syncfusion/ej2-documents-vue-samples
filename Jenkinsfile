#!groovy

node('EJ2Angularlatest') {
    try {
        deleteDir()        

        stage('Import') {
            git url: 'https://gitea.syncfusion.com/essential-studio/ej2-groovy-scripts.git', branch: 'master', credentialsId: env.GiteaCredentialID;
            shared = load 'src/shared.groovy'
        }

        stage('Checkout') {
            checkout scm
            shared.getProjectDetails()
            shared.gitlabCommitStatus('running')
        }

        stage('Install') {
            shared.install()
        }

        stage('Build') {
            sh 'gulp webservice-url'
            sh 'npm run doc-build'
        }

        stage('Publish') {
            shared.publish()
        }
       
        shared.gitlabCommitStatus('success')

        deleteDir()
    }
    catch(Exception e) {
        shared.throwError(e)
        sh 'gulp ci-report-mail --option Failure'
        deleteDir()        
    }
    
}

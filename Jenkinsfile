#!groovy
@Library('pipeline-shared')_

pipeline {
  agent {
    label {
      label 'test-chrome'
      customWorkspace "/home/jenkins/workspace/${env.JOB_NAME}@${env.BUILD_NUMBER}"
    }
  }

  environment {
    // hack, because for some reason the tests rely on this ENVAR being set
    MY_ENV = "jenkins-docker"

    // HACK: so we don't have to run "source asdf.sh" everywhere
    ASDF_DIR = sh(returnStdout: true, script: '''dirname $(locate -ew -n 1 asdf/bin)''').trim()
    ASDF_BIN = """${ASDF_DIR}/bin"""
    ASDF_USER_SHIMS = """${ASDF_DIR}/shims"""
    PATH = """${env.ASDF_USER_SHIMS}:${env.ASDF_BIN}:$PATH"""

    // Grab the container id for user by docker.withRun()
    CONTAINER_ID = sh(
      returnStdout: true,
      script: '''cat /proc/self/cgroup | grep "\\/docker\\/" | head -n 1 | sed 's/.*\\/docker\\///' | cut -c1-12'''
    ).trim()
  }

  options {
    buildDiscarder(logRotator(daysToKeepStr: '14'))
    timeout(time: 4, unit: 'HOURS')
  }

  stages {
    stage('tools') {
      when {
        expression { return fileExists("./.tool-versions") }
      }
      steps {
        sh 'asdf install'
      }
    }

    stage('dependencies') {
      parallel {
        stage('yarn') {
          when {
            expression { return fileExists("./package.json") }
          }
          steps {
            sshagent(['ssh-key']) {
              sh 'NODE_ENV=development yarn install'
            }
          }
        }
      }
    }

    stage('build') {
      parallel {
        stage('yarn') {
          when {
            expression { return fileExists("./package.json") }
          }
          steps {
            sh 'NODE_ENV=production yarn run build'
          }
        }
      }
    }

    stage('tests') {
      parallel {
        stage('javascript') {
          when {
            expression { return fileExists("./package.json") }
          }
          steps {
            sh 'yarn run test:jenkins'
          }
        }
      }

      post {
        always {
          junit 'junit.xml'

          cobertura(
            autoUpdateHealth: false,
            autoUpdateStability: false,
            coberturaReportFile: 'coverage/cobertura-coverage.xml',
            conditionalCoverageTargets: '70, 0, 0',
            failNoReports: false,
            failUnstable: false,
            lineCoverageTargets: '80, 0, 0',
            maxNumberOfBuilds: 0,
            methodCoverageTargets: '80, 0, 0',
            onlyStable: false,
            sourceEncoding: 'ASCII',
            zoomCoverageChart: false
          )
        }
      }
    }
  }

  post {
    always {
      cleanWs disableDeferredWipeout: true
    }

    cleanup {
      /* clean up our custom workspace */
      deleteDir()
      dir("${workspace}@tmp") {
        deleteDir()
      }
    }
  }
}
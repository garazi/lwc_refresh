# Dreamhouse_BRK

The is the Dreamhouse application for use with the Lightning Components BRK at Dreamforce, TrailheaDX and Salesforce World Tours.

### SFDX SETUP
You will need to have SFDX (Salesforce CLI) installed and VS Code.

* Using the CLI, navigate into the folder you created and execute the following command:
    * `git clone https://github.com/garazi/compCode.git Dreamhouse_LWC_Demo`
* Using the CLI, navigate into the newly created folder “Dreamhouse_LWC_Demo” and execute:
    * `git checkout -b version2`
* Log into your devhub with the following:
    * `sfdx force:auth:web:login -a dfDevHub`

        * Close the browser window once you have authenticated
* Run the following command, where YOUR_ORG_NAME is whatever you want:
    * `sfdx force:org:create -f config/project-scratch-def.json -s -a YOUR_ORG_NAME -d 30 -w 10`
* Once the scratch org has been created, execute the following commands:
    * `sfdx force:org:open`
    * `sfdx force:source:pull`
    * `sfdx force:source:push`
    * `sfdx force:user:permset:assign -n All_Access`

### SCRATCH ORG ONLY (for use with the Developer Console)
If you only intend to use the Developer Console, you can click this button to create a scratch org.

[![Deploy](https://deploy-to-sfdx.com/dist/assets/images/DeployToSFDX.svg)](https://sfdx-deployer-app.herokuapp.com/launch?template=https://github.com/garazi/Dreamhouse_BRK)


### FINAL STEPS

* In the org, open the App Launcher and choose **Dreamhouse Lightning**.
* Choose the **Data Import** tab, and click the **Initialize Sample Data** button.
* Click on the **Properties** tab to confirm that you have a list of properties.

# Frontend App (React Native Expo)

## Git Commit convention
1. Make a branch before you start working on your code. <br>
``` git checkout -b <new branch name> ``` <br>
⚠️ We are going to be creating branch names with the Jira Issue ID followed by the type of branch prefix (listed in the bottom of this README) <br>
How we should name branches: 
   > ex) ```feature/TAS-26@create-button-component```
2. After you are done with implementing each issue, create a PR to ```dev```.

   1. Commit and push the branch you created.
   2. Create a Pull Request in this repository.
   3. Name you PR correctly according to our Git convention.
   4. Fill out the PR description template.
   5. Label your PR.
   
    ⚠️ The PR title should be something similar to your branch name. The Jira Issue ID and a short summary of what you implemented. <br>
   > ```[TAS-24]: create-button-component``` <br>
   > ❗ You can label your PR by select the tag on the right side of the PR screen under "Label". <br>
      
   > You might also have to fast-forward your current working branch to dev in order to prevent merge conflicts.
   
4. Review the PR.
   
   ❗❗ Reviewing your peers' code is important. It is not about just clicking "approve". See the changes and comment on the code. <br>
   Suggest them with a better code style. Ask them what you don't understand from the code. 
   
   > ```dev``` is a protected branch. We need your reviews and approval in order to merge.
   > read your peer's code and add comments to them if needed!
   > It would be great if you switch out to their branch and test it with the simulator running.
   
7. Merge to ```dev```.
   1.  When the reviewing process is done and is approved, check for conflicts. <br>
   2.  If there are no conflicts the person who created the PR will merge to dev. <br><br>
   ⚠️ MERGING SHOULD BE DONE BY THE PERSON WHO IMPLEMENTED THE CODE!

8. After each SPRINT I will merge ```dev``` to ```main```.
   > ⭐ Remember to pull before starting any work!!


## Useful stuff

⚠️⚠️⚠️ Do not fix the dependency warnings that is in our expo App. ⚠️⚠️⚠️ <br>
⚠️⚠️⚠️ We are using ```yarn``` instead of ```npm/npx```. ⚠️⚠️⚠️ <br>
❗ When you need to install a package for the App, please check the size of the package and discuss with our teammates about it. 

### Check for confilcts
⭐ Don't forget to pull from ```dev``` and rebase before creating a PR or before merging into ```dev```!<br>
   1. Switch out to dev. ```git switch dev```
   2. Pull from dev. ```git pull```
   3. Switch back to you current working branch. ```git switch <your branch name>```
   4. Rebase dev to your branch. ```git rebase dev```

   > all of your local branches with ```git branch```  <br>
   > update your local like the remote with ```git remote update```  <br>
   > all of the branches (local and remote) with ```git branch -a``` <br>
   
⚠️ If there is an error doing ```pull``` try ```git config --global pull.rebase true```. <br>
(I use rebase for default when pulling.)


### Testing the App on a different branch

1. Switch out to the ```dev``` branch.
   >  ```git switch dev``` 
2. Update your local sot that its in the same state as remote.
   > ```git remote update```
3. Switch to the branch you are testing.
   > ```git checkout branchname```
   > ```branchname``` should be the name of the branch that you want to checkout to.
   > you can see the branches by using ```git branch -a```.
   
4. Pull from the branch once more just to make sure.

### PR convention

⭐ Don't use past tense for git commit, branches, PR.
  
|branch prefix| use|
|--|--|
|hotfix|	for quickly fixing critical issues usually with a temporary solution|
|fix|	for fixing a bug|
|feature|	for adding, removing or modifying a feature|
|refactor| for modifying the code as in a different style, delete comments, etc.|
|WIP|	for a work in progress|

### Error in Expo

1. Try deleting the node_modules and re-build the app.
   > ```rm -rf node_modules``` (mac)<br>
   > ```yarn```<br>
   > ```yarn expo start```
2. You can ignore this message:
   > ```Require cycle: src/StyleToProps/index.tsx -> src/StyleToProps/Col.tsx -> src/StyleToProps/index.tsx``` <br>
   > ```Require cycle: src/StyleToProps/index.tsx -> src/StyleToProps/Row.tsx -> src/StyleToProps/index.tsx```

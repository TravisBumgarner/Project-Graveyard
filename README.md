I need less clutter of dumb shit in my repos list

To move something in here:

```
git remote add GIVE_IT_A_NAME git@github.com:TravisBumgarner/CURRENT_REPO.git
git fetch GIVE_IT_A_NAME
git merge -s ours --no-commit --allow-unrelated-histories GIVE_IT_A_NAME
git merge -s ours --no-commit --allow-unrelated-histories GIVE_IT_A_NAME/branch_name_here
git read-tree --prefix=GIVE_IT_A_NAME -u GIVE_IT_A_NAME/master
git commit -m "imported GIVE_IT_A_NAME repo as subtree"
git pull -s subtree GIVE_IT_A_NAME master
```

As an example
```
git remote add networking git@github.com:TravisBumgarner/networking.git
git fetch networking
git merge -s ours --no-commit --allow-unrelated-histories networking
git merge -s ours --no-commit --allow-unrelated-histories networking/master
git read-tree --prefix=networking -u networking/master
git commit -m "imported networking repo as subtree"
git pull -s subtree networking master
```
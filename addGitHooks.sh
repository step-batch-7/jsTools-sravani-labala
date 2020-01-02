#!/bin/bash

cat <<EOF > .git/hooks/pre-commit  
npm run alltests
if [ \$? != 0 ]; then 
    echo "tests are failing"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-commit  
cat <<EOF > .git/hooks/pre-push  
npm run lint
if [ \$? != 0 ]; then 
    echo "eslint is showing errors"
    exit 1
fi
EOF
chmod +x .git/hooks/pre-push  
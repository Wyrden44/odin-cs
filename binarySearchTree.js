import mergeSort, { getRandomArray } from "./mergesort.js";

function Node(value, left=null, right=null) {
    return { value, left, right }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);    
    }

    buildTree(arr) {
        console.log(arr);
        let sortedArr = mergeSort(arr);
        console.log(sortedArr);
        return this.buildTreeRecursive(0, sortedArr.length-1, sortedArr);
    }

    buildTreeRecursive(left, right, arr) {
        if (left > right) return null;
        const middle = Math.floor(left + (right - left) / 2);

        const root = Node(arr[middle]);
        
        root.left = this.buildTreeRecursive(left, middle-1, arr);
        root.right = this.buildTreeRecursive(middle+1, right, arr);

        return root;
    }

    insert(value) {
        if (this.root == null) {
            this.root = Node(value);
            return;
        }

        this.insertRecursive(this.root, value)
    }

    deleteItem(value) {
        this.deleteRecursive(this.root, value);
    }

    find(value) {
        let node = this.root;
        while (node != null) {
            if (value > node.value) {
                node = node.right;
            }
            else if (value < node.value) {
                node = node.left;
            }
            else if (value === node.value) {
                return node;
            }
        }
        return null;
    }

    levelOrder(callback) {
        if (typeof(callback) != "function") throw new Error("Callback is not a function.");
        // runs the callback on each node in bfs order
        if (this.root == null) return;
        let queue = [this.root];
        while (queue.length > 0) {
            let node = queue.shift();
            
            if (node.left != null) {
                queue.push(node.left)
            }
            if (node.right != null) {
                queue.push(node.right);
            }

            callback(node);
        }
    }

    preOrder(callback) {
        // runs the callback on each node in dfs preorder
        if (this.root == null) return;
        if (typeof(callback) != "function") throw new Error("Callback is not a function.");
        this.preOrderRecursive(this.root, callback)
    }

    preOrderRecursive(node, callback) {
        if (node != null) {
            callback(node);
            this.preOrderRecursive(node.left, callback);
            this.preOrderRecursive(node.right, callback);
        }
    }

    inOrder(callback) {
        // runs the callback on each node in dfs inOrder
        if (this.root == null) return;
        if (typeof(callback) != "function") throw new Error("Callback is not a function.");
        this.inOrderRecursive(this.root, callback)
    }

    inOrderRecursive(node, callback) {
        if (node != null) {
            this.inOrderRecursive(node.left, callback);
            callback(node);
            this.inOrderRecursive(node.right, callback);
        }
    }

    postOrder(callback) {
        // runs the callback on each node in dfs postOrder
        if (this.root == null) return;
        if (typeof(callback) != "function") throw new Error("Callback is not a function.");
        this.postOrderRecursive(this.root, callback)
    }

    postOrderRecursive(node, callback) {
        if (node != null) {
            this.postOrderRecursive(node.left, callback);
            this.postOrderRecursive(node.right, callback);
            callback(node);
        }
    }

    height(value) {
        let node = this.find(value);
        if (node != null) {
            return this.getHeightRecursive(node);
        }
    }

    depth(value) {
        let node = this.root;
        let height = 0;
        while (node != null) {
            if (value > node.value) {
                node = node.right;
                height++;
            }
            else if (value < node.value) {
                node = node.left;
                height++;
            }
            else {
                return height;
            }
        }
        return null;
    }

    isBalanced() {
        if (this.root == null) {
            return true;
        }
        return this.isBalancedRecursive(this.root);
    }

    rebalance() {
        let arr = [];
        this.inOrder((node) => {arr.push(node.value)});
        this.root = this.buildTree(arr);
    }

    isBalancedRecursive(node) {
        if (node.left == null && node.right == null) return true;
        if (node.right == null) return this.height(node.left.value) <= 1;
        if (node.left == null) return this.height(node.right.value) <= 1;
        if (this.height(node.left.value) - this.height(node.right.value) > 1) return false;
        return this.isBalancedRecursive(node.left) && this.isBalancedRecursive(node.right)
    }

    getHeightRecursive(node) {
        if (node.left == null && node.right == null) return 0;
        if (node.left == null) return 1 + this.getHeightRecursive(node.right);
        if (node.right == null) return 1 + this.getHeightRecursive(node.left);

        let leftHeight = 1 + this.getHeightRecursive(node.left);
        let rightHeight = 1 + this.getHeightRecursive(node.right);

        return (leftHeight > rightHeight) ? leftHeight : rightHeight;
    }

    deleteRecursive(node, value) {
        if (node == null) {
            return node;
        }

        if (value > node.value) {
            node.right = this.deleteRecursive(node.right, value);
        }
        else if (value < node.value) {
            node.left  = this.deleteRecursive(node.left, value);
        }
        else { // found node
            if (node.left != null && node.right != null) {
                // internal node
                let succ = this.findSucc(node);
                node.value = succ.value;
                node.right = this.deleteRecursive(node.right, succ.value);
                return node;
            }
            else if (node.left != null) {
                return node.left;
            }
            else if (node.right != null) {
                return node.right;
            }
            else {
                // leaf
                return null;
            }
        }

        return node;
    }

    findSucc(node) {
        let succ = node.right;
        while (succ.left != null) {
            succ = succ.left;
        }
        
        return succ;
    }

    insertRecursive(node, value) {
        if (value < node.value) {
            if (node.left == null) {
                node.left = Node(value);
                return;
            }
            this.insertRecursive(node.left, value);
        }
        else if (value > node.value) {
            if (node.right == null) {
                node.right = Node(value);
                return;
            }
            this.insertRecursive(node.right, value);
        }
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node == null) {
            return;
        }
        if (node.right != null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left != null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

//const arr = getRandomArray();
let arr = [1, 4, 5, 6, 8, 3, 50, 20, 30, 53, 2];
const tree = new Tree(arr);
console.log(tree.root);
tree.insert(110);
tree.insert(21);
tree.insert(23);
tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
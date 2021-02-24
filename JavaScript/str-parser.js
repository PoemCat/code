const str = '1 + 2 * ( 3 + 4 )';
const prec = {
    '(': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
    ')': 1
}

const operators = ['+', '-', '*', '/'];
// 遵循以下步骤：
// (1) 初始化两个栈：运算符栈S1和储存中间结果的栈S2；
// (2) 从右至左扫描中缀表达式；
// (3) 遇到操作数时，将其压入S2；
// (4) 遇到运算符时，比较其与S1栈顶运算符的优先级：
// (4-1) 如果S1为空，或栈顶运算符为右括号“)”，则直接将此运算符入栈；
// (4-2) 否则，若优先级比栈顶运算符的较高或相等，也将运算符压入S1；
// (4-3) 否则，将S1栈顶的运算符弹出并压入到S2中，再次转到(4-1)与S1中新的栈顶运算符相比较；
// (5) 遇到括号时：
// (5-1) 如果是右括号“)”，则直接压入S1；
// (5-2) 如果是左括号“(”，则依次弹出S1栈顶的运算符，并压入S2，直到遇到右括号为止，此时将这一对括号丢弃；
// (6) 重复步骤(2)至(5)，直到表达式的最左边；
// (7) 将S1中剩余的运算符依次弹出并压入S2；
// (8) 依次弹出S2中的元素并输出，结果即为中缀表达式对应的前缀表达式。

const middle2Prefix = (str) => {
    const opts = str.split(/\s+/).reverse();
    const s1 = [];
    let s2 = [];
    opts.forEach(opt => {
        if (operators.includes(opt)) {
            let top;
            while (top = s1.pop()) {
                if (prec[top] < prec[opt]) {
                    s1.push(top)
                    break;
                } else {
                    s2.push(top)
                }
            }
            s1.push(opt);
        } else if (opt === '(') {
            let val;
            while (val = s1.pop()) {
                if (val === ')') {
                    break;
                }
                s2.push(val)
            }
        } else if (/\d+/.test(opt)) {
            s2.push(opt)
        } else if (opt === ')') {
            s1.push(opt)
        }
    })
    s2 = s1.concat(s2.reverse())
    return s2.join(' ');
}

console.log(middle2Prefix('( ( ( 35 + 15 ) * ( 80 - 70 ) ) / 20'))
console.log(middle2Prefix('1 + 2 + 3 * ( 4 + 5 )'))

const opMethods = {
    '+': function(n1, n2) {
        return n1 + n2;
    },
    '-': function(n1, n2) {
        return n1 - n2;
    },
    '*': function(n1, n2) {
        return n1 * n2;
    },
    '/': function(n1, n2) {
        return n1 / n2;
    }
}

const calcPrefix  = (middleStr) => {
    const stack =  middleStr.split(/\s+/);
    const f = () => {
        let s = stack.shift();
        switch(s) {
            case '+': {
                return f() + f();
            };
            case '-': {
                return f() - f();
            }
            case '*': {
                return f() * f();
            }
            case '/': {
                return f() / f();
            }
            default: return parseFloat(s);
        }
    }
    return f()
}

console.log(calcPrefix(middle2Prefix('( ( ( 35 + 15 ) * ( 80 - 70 ) ) / 20')))
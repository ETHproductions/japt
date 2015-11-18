# Japt

**Japt** is is a shortened version of **Ja**vaScri**pt**. [Interpreter](http://codegolf.stackexchange.com/a/62685/42545) (this will be moved to its own page soon)

## Basic programs

### Hello, World!

    "Hello, World!

In Japt, the last expression is automatically outputted. Also, when you have a string literal at the end of the program, you can leave it out and it will be automatically inserted.

### Greeting

    "Greetings, {U}!

Let's move on to input: the first few inputs (up to six) are stored in the variables `U`, `V`, `W`, `X`, `Y`, and `Z`. In case that's not enough, the entire input is stored as an array in `N`.

Also shown here: curly braces inside the string tell the interpreter to evaluate the innards as Japt code. For example, `"abc{U}xyz"` compiles to `"abc"+(U)+"xyz"`.

## New Syntax

The syntax of Japt is much the same as JavaScript; in fact, after making some regex replacements, it is evaluated as normal JS. Here's the specialties:

### Parentheses and spaces

When compiling, each right parenthesis `)` is doubled `))`, then each space is replaced with `)`. This helps to save space when nesting function calls.
Also, if you have extra parentheses next to semicolons or at the beginning or end of the program, you can leave them out. The interpreter will catch on and add them when compiling.
(But please be careful! This feature does not work 100% properly yet.)

### Variables

All uppercase letters are pre-defined to different values. `A-L` are numbers, `M` is the `Math` object, `P-S` are text-related, and `U-Z` are the first six inputs. Besides keeping variable-related things simple, this also allows us to shorten syntax even more with...

### Variable functions

A variable or literal of any sort can be followed by a lowercase letter. This will automatically compile to a function call. For example, `"abc"q` becomes `"abc".q(`, which functions as `"abc".split(`. `23s2` compiles to `23 .s(2)`, or `23 .toString(2)`; `"asdf"s1,3` compiles to `"asdf".s(1,3)`, or `"asdf".slice(1,3)`.

Since most of these functions return values, you can chain them: `"abcdefghij"s2,6 n36` compiles to `"abcdefghij".s(2,6).n(36)`, or `"abcdefghij".slice(2,6).toNumber(36)`.

### Single char and char-code shortcuts

If you need a string made of a single char, you can type an apostrophe, then the char, like `'a`. This compiles to `"a"`, which can be used exactly the same as all other strings. Similarly, `#a` compiles to the character code of `a`, or `97`. If you need a large number (`>= 100`), this is probably the cheapest way to attain it.

### String interpolation

Thanks to the power of the regex, you can use ES6's string interpolation in Japt! Anything inside curly braces in a string is evaluated as actual code. For example, `"abc{U}xyz"`: compiles to `"abc"+(U)+"xyz"`. If you need to use actual curly braces in the string, just precede the left brace with a backslash, like so: `"abc\{U}xyz"`

Need to return one of two different strings, using `a?b:c` syntax? No problem! You can omit the two middle quotation marks. E.g. `U==1?"abc":"xyz"` can be shortened to `U==1?"abc:xyz"`. But what's that? One of the strings already contains a colon? Well, there's a remedy for that, too! Just precede the colon with a backslash. `U==1?"abc\:123:xyz"` compiles to `U==1?"abc:123":"xyz"`.

Other features: (more detail soon)

- `A{...}`: anonymous function with parameter `A` (not working yet)
- `$...$`: insert pure JavaScript (inspired by the same feature in Pyth)
- `@`: compiles to `(X,Y,Z)=>`
- Missing quote at end of program: automatically inserted

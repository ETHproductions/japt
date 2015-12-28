# Japt

**Japt** is is a shortened version of **Ja**vaScri**pt**. [Online interpreter](http://ethproductions.github.io/japt)

## Basic programs

### Hello, World!

    "Hello, World!

In Japt, the last expression is automatically outputted. Also, when you have a string literal at the end of the program, you can leave out the ending quotation mark and it will be automatically inserted.

Even shorter:

    `HÁM, Wld!

(Note that the `` should be code point U+008E.)

Japt uses the [shoco library](http://ed-von-schleck.github.io/shoco/) for string compression. Wrapping your text in backticks `` ` `` instead of quotation marks `"` tells the interpreter to automatically decompress the string. And like quotes, if you have a backtick at the end of a program, you can leave it off.

### Greeting

    "Greetings, {U}!

Let's move on to input: the first few inputs (up to six) are stored in the variables `U`, `V`, `W`, `X`, `Y`, and `Z`. In case that's not enough, the entire input is stored as an array in `N`.

Also shown here: curly braces inside the string tell the interpreter to evaluate the innards as Japt code. For example, `"abc{U}xyz"` compiles to `"abc"+(U)+"xyz"`.

Again, with compression:

    `GÎ>Ä, {U}!
    
(Note that this time, the `` should be code point U+000F.)

### `cat`

    N

Since all input is stored in `N`, and output is implicit, all we have to do is call `N` to output all of the input.

### Quine

    1

Taking advantage of Japt's automatic output, any single number is trivially a quine. But what fun is that? Let's try a better one:

    "+Q p3 sA,J"+Q p3 sA,J
    "+Q p3 sA,J"            // Take this string,
                +Q          // add a quotation mark,
                   p3       // repeat it 3 times,
                      sA,J  // and slice off the first 10 chars and last 1 char. (A = 10, J = -1)

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

Oh, and one more thing: if you have a string literal at the end of a program, you can leave out the final quotation mark, and the interpreter will automatically insert it for you.

### String compression

Japt uses the [shoco library](http://ed-von-schleck.github.io/shoco/) for string compression. You can access this in a few ways:

- Using `Oc"text to compress"`, you can compress the text to save bytes.
- Using `Od"text to decompress"`, you can decompress the pre-compressed text.
- Wrapping your text in backticks `` ` `` instead of quotation marks `"` tells the interpreter to automatically decompress the string.

### Unicode shortcuts

Japt code can be compressed, similarly to its strings. The most commonly used runs of characters are mapped to Unicode points, starting at `¡`. An (almost) full list of these can be found at [the online interpreter](http://ethproductions.github.io/japt).

### Anonymous functions

With ES6, we got the new fat arrow operator `=>`, which quickly and concisely defines a function. In Japt, the equivalent is `{`, with any number of uppercase letters preceding it as arguments. For example, `XY{X+Y}` defines a function that takes in two arguments, and returns the result of adding them (or concatenating them, if one is a string). 

There's also two shortcut operators:

- `@`, which stands in for `XYZ{`. `UrXY{X+Y}` can be reduced to `Ur@X+Y}`.
- `_`, which stands in for `Z{Z`. `UmX{Xc}` can be reduced to `Um_c}`.

Also, when performing a single-char operation as a function, you can usually just reduce the function to one or two chars:

- When doing something like `UrXY{X+Y}`, you can simply use the operator: `Ur+`
- When the arguments are reversed, like with `UrXY{Y-X}`, just prefix the operator with an exclamation point: `Ur!-`
- When using a single prototype function, e.g. `UmX{Xc}`, just use the letter: `Umc`

### Pure JS

Have a task that Japt just can't handle yet on its own? Well, the good news is, you can call pure JavaScript code inside a Japt program! Anything between dollar signs `$...$` will be preserved through the compilation process. For example, Japt doesn't actually have `for` loops yet, so you could use something similar to `$for(Z=0;Z<A;Z++)$` instead.

/* Auto Golfer: node version */


// Require file system core module from Node
fs = require('fs')

// File to read
var inputFile = process.argv[2]

// File to output
var outputFile = process.argv[3]

// If input filename preset
if (inputFile) {

  // Read file
  fs.readFile(inputFile, 'ascii', function(err, data) {

    // If error reading input file
    if (err) {

      console.log('ERROR: could not read file: '+inputFile)

    }

    // Otherwise if success reading input file
    if (data) {

      var original = data.length

      data = data

      /* ### COMMENTS ### */

        /* remove multiline comments */
        .replace(/^\s*\/\*([\s\S]*?)\*\//gm,'')

        /* remove single line comments */
        .replace(/\/\/.*\n/g,'')


      /* ### SPACES ### */

        /* remove space after comma */
        .replace(/, /g,',')

        /* remove space before bracket open */
        .replace(/ \(/g,'(')

        /* remove space before curly bracket open */
        .replace(/ \{/g,'{')

        /* remove space before bracket close */
        .replace(/\) /g,')')

        /* remove space before curly bracket close */
        .replace(/\} /g,'}')

        /* remove space after semicolon */
        .replace(/; /g,';')

        /* remove space before operators */
        .replace(/ ([+=\-\/\*<>\?\:%\^])/g,function(match,string){return string})

        /* remove space after operators */
        .replace(/([+=\-\/\*<>\?\:%\^]) /g,function(match,string){return string})

        /* remove space around '==' */
        .replace(/ == /g,'==')

        /* remove space around '+= */
        .replace(/ \+= /g,'+=')


      /* ### GOLFS ### */

        /* remove 'var ' */
        .replace(/var /g,'')

        /* replace Math.floor with '~~' */
        .replace(/Math\.floor/g,'~~')

        /* remove window */
        .replace(/window\./g,'')


      /*  ### VARIABLES ###  */

        /* replace 'block_size' with h */
        .replace(/block_size/g,'h')

        /* replace 'synth' with i */
        .replace(/synth/g,'i')

        /* replace 'oscillator' with j */
        .replace(/oscillator/g,'j')

        /* replace 'gainModule' with k */
        .replace(/gainModule/g,'k')

        /* replace 'current_digit' with l */
        .replace(/current_digit/g,'l')

        /* replace 'current_block' with m */
        .replace(/current_block/g,'m')

        /* replace 'loop_count' with n */
        .replace(/loop_count/g,'n')

        /* replace 'message' with o */
        .replace(/message/g,'o')

        /* replace 'output' with p */
        .replace(/output/g,'p')

        /* replace 'current_character' with q */
        .replace(/current_character/g,'q')

        /* replace 'count' with r */
        .replace(/count/g,'r')

        /* replace 'animation' with s */
        .replace(/animation/g,'s')


      /* ### MINIFY ### */

        /* remove empty lines */
        .replace(/^\s*[\n]/gm,'')

        /* trim preceeding whitespace */
        .replace(/^\s*/gm,'')

        /* remove line breaks */
        .replace(/\n/g,'')

      var transformed = data.length

      // If output file specified
      if (outputFile) {

        // Write file
        fs.writeFile(outputFile, data, function(err){

          // If error writing output file
          if (err) {

            console.log('ERROR: could not write file: '+outputFile)

          }

        })

      // Otherwise if no output file specified
      } else {

        // Display output in console
        console.log('\n' + data)

      }

    }

    // Display stats
    console.log('\n')
    console.log('Before: '+original+' bytes')
    console.log('After: '+transformed+' bytes')
    console.log('Saved: '+(original-transformed)+' bytes ('+(100 - Math.floor((transformed/original)*1000)/10)+'%)')
    console.log('\n')

  })

}
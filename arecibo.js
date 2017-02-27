/* The Arecibo Message */
// by Tommy Hodgins


/* Set the Background */
// Set the `bgcolor` attribute of the <body> tag to `0`
// This makes the background of the demo black

b.bgColor = 0;


/* Set Block Size */
// The image is 73 blocks tall, so divide the window's height by 73

var block_size = innerHeight / 73;


/* Set Canvas Size */
// Set the resolution & width of our <canvas> tag to 23 blocks wide

a.width = 23 * block_size;
a.style.width = 23 * block_size + 'px';


/* Create Synth */
// We will be using the web audio API to generate sound

var synth = new window.AudioContext;


/* Create Oscillator */
// In order for our synth to play audio we need to generate a waveform

var oscillator = synth.createOscillator();


/* Create Gain Module */
// In order to adjust the volume of the oscillator

var gainModule = synth.createGain();


/* Set Waveform Type */
// Available waveform types are: sine, sawtooth, square, & triangle

oscillator.type = 'sawtooth';


/* Connect Gain to Oscillator */

oscillator.connect(gainModule);


/* Connect Oscillator to Synth */

gainModule.connect(synth.destination);


/* Start the Oscillator */

oscillator.start();


/* Zeroing Our Variables */
// These values and variables we will be adjusting later
// We create them here and set their value to 0

gainModule.gain.value
= current_digit
= current_block
= current_character
= loop_count
= 0;


/* The Arecibo Message */
// The full message is 23*73 characters long (1679 bytes)
// It is shown here encoded via Run Length Encoding (RLE)
// The resulting values have been encoded as ascii characters shifted +40 places

message = '.)))))))4)))-)))/)*)+)+)+)*))**)))))))))))))))))*)*)M*;*));*)):))))):-H*,++*,*+)5**),*))+*+*,*)))-)-)-)-B)9)D)9.5-?*,*,++*+)/)1),*)),*++**)))-)-)-)-B).*1)3*7)-*2.-*.-2*5)0)0)-).*/)/*,*.)2*+),*7***5*+),*1*,*.)/).)0)-)/*0)+)0*0)+)1)/)-)/)/)/)4*1*0*1)++)))*3)/)6)--4),))+))*))*)*.)*+*)*/)+,+-*)+1)))-+)**).)))-.*).)))-*.)-*)*K+-)6+))))+)))))))))))*+1)))))))8)))6-814+/+1*3*/*))1))*-***/***,)+)))-)))+),)+)*)+)*)+)0)+)))+)4),),)4)1)6)*)))3,*-))*,+';


/* Create Empty Output String */
// As we decode the message we will be storing the extracted message here

output = '';


/* Loop Over Encoded Message */
// Repeat these steps for each character

for (; current_character < message.length; current_character++) {


  /* Determine Length of Sequence */
  // Read the ASCII character code of the current character and subtract 40

  count = message.charCodeAt(current_character) - 40;


  /* While the Sequence has at Least One Digit Remaining */

  while (count) {


    /* Append the Current Digit to the Decoded Output */

    output += current_digit;


    /* Decrement the Sequence Count by 1 */

    count--
  }


  /* Alternate between 0 and 1 */
  // Flip the current digit each time a sequence has been decoded

  current_digit = current_digit ^ 1

}


/* The Animation */

animation = setInterval(() => {


  /* If the Current Digit is a One */

  if (output[current_block] == 1) {


    /* Set the Oscillator Frequency */
    // The frequency is the note you hear
    // Set this to the current block's index divided by ten, plus 200hz

    oscillator.frequency.value = current_block / block_size + 200;


    /* Set Fill to Semitransparent Black */

    c.fillStyle = 'rgba(0,0,0,.01)';


    /* Fill Canvas with Overlay */

    c.fillRect(
      0,
      0,
      innerWidth,
      innerHeight
    );


    /* Set Block Fill Color */
    // Color based on loop count

    c.fillStyle = 'hsl('+ loop_count * 10 + 120 +', 100%, 50%)';


    /* Paint Block */
    // The block is painted at coordinates based on its location in the message
    // X position is the remainder of the current index divided by 23
    // Y position is the floored integer of the current index divided by 23

    c.fillRect(
      current_block % 23 * block_size,
      Math.floor(current_block / 23) * block_size,
      block_size,
      block_size
    );


    /* Adjust Gain Volume */
    // If painting a block, set volume to 20%

    gainModule.gain.value = .2


  /* Otherwise, if digit is a Zero */

  } else {


    /* Mute Gain Volume */

    gainModule.gain.value = 0

  }


  /* Loop animation */
  // Increment the loop counter and reset current block to zero if on last block
  // Otherwise increment the block counter by one

  current_block == output.length
  ? (loop_count++, current_block = 0)
  : current_block++

}, block_size)
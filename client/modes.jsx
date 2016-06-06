// HTML Mixed mode depends on XML, JavaScript, CSS modes
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/css/css');
require('codemirror/mode/htmlmixed/htmlmixed');

// PHP mode depends on XML, JavaScript, CSS, HTML Mixed, and C-Like modes
require('codemirror/mode/clike/clike');
require('codemirror/mode/php/php');

require('codemirror/mode/cmake/cmake');
require('codemirror/mode/coffeescript/coffeescript');
require('codemirror/mode/http/http');
require('codemirror/mode/jsx/jsx');
require('codemirror/mode/mathematica/mathematica');
require('codemirror/mode/perl/perl');
require('codemirror/mode/properties/properties');
require('codemirror/mode/python/python');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/sass/sass');
require('codemirror/mode/shell/shell');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/swift/swift');
require('codemirror/mode/yaml/yaml');

// GFM mode optionally depends on other modes for properly highlighted code blocks
require('codemirror/mode/gfm/gfm');
pastenot.es
===========
pastenot.es is a pastebin web-service powered by isomorphic JavaScript
and is intended to be "_an objectively better pastebin web-service_".

**Note:**
This project is currently an alpha release. Many planned features are yet to be implemented and some current features may not be working at all. The application hosted at https://pastenot.es is a developmental preview. Although I plan on keeping it synced to this repo, the live application may not necessarily reflect what is currently in this repo.

Features:
--------
**UI**
> pastenot.es features a beautiful, elegant interface -- similar to what you may be used to in a desktop editor.

> I chose to implement side and bottom panels as opposed to an ultra-minimalist interface as the panels provide a non-intrusive way to implement UI elements and features while keeping a clean interface.

**No language auto-detection**
> Apart from adding unnecessary overhead, the current language detection algorithms for implementing automatic syntax highlighting often choose arbitrary languages that do not match the intended language of the code.

> pastenot.es defaults to plain text (no highlighting) but provides a simple interface for choosing the desired language for syntax highlighting

**Performance:**
> Written in isomorphic JavaScript, pastenot.es has the performance benefits of server-sided rendering for React.JS. Pastenot.es also uses MongoDB for the database backend to efficiently store and fetch the pastes.

Installation:
------------
You can install and run this application using standard procedures for any Node.JS app:

    $ git clone https://github.com/quoeradem/pastenot.es
    $ npm install

The above steps will download this repo and install the necessary modules.

**Remember to edit the `config.json` file with the settings you wish to use!**

You can then build the bundles with [webpack](https://webpack.github.io/) and run the application using:

    $ npm run build
    $ npm run start

_Note:_ I have included a [pm2](http://pm2.keymetrics.io/) JSON configuration file for convenience. After building the bundles, you can alternatively start the application with `pm2` by running `$ pm2 start process.json`.

Todo:
----
* Refactoring / cleanup of existing code.
* Minor UI changes + fix some styling inconsistencies.
* Improve API backend.
* Implement `Immutable.js`.
* Add key maps to improve usability.
* ~~User authentication via GitHub.~~
* ~~Fix auth flow.~~
* Improve syntax highlighting.
* `¯\_(ツ)_/¯`

License
-------
pastenot.es is licensed under The MIT License (MIT). A copy of this license has been included in `LICENSE`.

Copyright © 2016 Trevor Kulhanek
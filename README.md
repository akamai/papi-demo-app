# "Using PAPI" reference code

This is the code that goes along with the [Using PAPI](https://community.akamai.com/community/developer/blog/tags#/?tags=property%20manager) series of blog posts hosted at Akamai Community.

Please follow along with the tutorial series to learn how this code works.

For more information about Akamai APIs, see the [{OPEN} Developer Site](https://developer.akamai.com/).

## Quick Install

Clone this repository, then _create a new file called `.edgerc` in the main directory of the project_ with your own PAPI credentials:

```plaintext
[papi]
host = akaa-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.luna.akamaiapis.net/
client_token = akab-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
client_secret = XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=
access_token = akab-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
max-body = 131072
```

Then run the following commands:

```bash
# install dependencies
$ npm install
# move Angular source to public/js
$ cp node_modules/angular/angular.* public/js/
$ cp node_modules/angular-route/angular-route.* public/js/
$ cp node_modules/angular-resource/angular-resource.* public/js/
$ cp node_modules/angular-loading-bar/build/loading-bar.* public/lib/
$ cp node_modules/angular-toarrayfilter/toArrayFilter.* public/js
# run server
$ npm start
```

Go to http://localhost:3000/ and wait a few seconds to see a listing of PAPI groups.

## License

> Copyright 2015 Akamai Technologies, Inc. All Rights Reserved.
> 
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
>
> A copy of the License is distributed with this software, or you
> may obtain a copy of the License at 
>
>    http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.

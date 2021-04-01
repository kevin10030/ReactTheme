<?php
    $company_size = array(
        "1"     => "Myself only",
        "10"    => "2-10 employees",
        "50"    => "11-50 employees",
        "200"   => "51-200 employees",
        "500"   => "201-500 employees",
        "1000"  => "501-1,000 employees",
        "5000"  => "1,001-5,000 employees",
        "10000" => "5,001-10,000 employees",
        "13000" => "10,001+ employees",
    );

    $country = array(
        "US"=> "United States",
        "GB"=> "United Kingdom",
        "CA"=> "Canada",
        "AU"=> "Australia",
        "MX"=> "Mexico",
        "ZA"=> "South Africa",
        "AF"=> "Afghanistan",
        "AX"=> "Åland Islands",
        "AL"=> "Albania",
        "DZ"=> "Algeria",
        "AS"=> "American Samoa",
        "AD"=> "Andorra",
        "AO"=> "Angola",
        "AI"=> "Anguilla",
        "AG"=> "Antigua and Barbuda",
        "AQ"=> "Antarctica",
        "AR"=> "Argentina",
        "AM"=> "Armenia",
        "AW"=> "Aruba",
        "AU"=> "Australia",
        "AT"=> "Austria",
        "AZ"=> "Azerbaijan",
        "BS"=> "Bahamas",
        "BH"=> "Bahrain",
        "BD"=> "Bangladesh",
        "BB"=> "Barbados",
        "BY"=> "Belarus",
        "BE"=> "Belgium",
        "BZ"=> "Belize",
        "BJ"=> "Benin",
        "BM"=> "Bermuda",
        "BT"=> "Bhutan",
        "BO"=> "Bolivia",
        "BA"=> "Bosnia and Herzegovina",
        "BW"=> "Botswana",
        "BR"=> "Brazil",
        "IO"=> "British Indian Ocean Territory",
        "VG"=> "British Virgin Islands",
        "BN"=> "Brunei",
        "BG"=> "Bulgaria",
        "BF"=> "Burkina Faso",
        "BI"=> "Burundi",
        "KH"=> "Cambodia",
        "CM"=> "Cameroon",
        "CA"=> "Canada",
        "CV"=> "Cape Verde",
        "KY"=> "Cayman Islands",
        "CF"=> "Central African Republic",
        "TD"=> "Chad",
        "CL"=> "Chile",
        "CN"=> "China",
        "CX"=> "Christmas Island",
        "CC"=> "Cocos (Keeling) Islands",
        "CO"=> "Colombia",
        "KM"=> "Comoros",
        "CK"=> "Cook Islands",
        "CR"=> "Costa Rica",
        "HR"=> "Croatia",
        "CU"=> "Cuba",
        "CW"=> "Curaçao",
        "CY"=> "Cyprus",
        "CZ"=> "Czechia",
        "DK"=> "Denmark",
        "DJ"=> "Djibouti",
        "DM"=> "Dominica",
        "DO"=> "Dominican Republic",
        "CD"=> "DR Congo",
        "EC"=> "Ecuador",
        "EG"=> "Egypt",
        "SV"=> "El Salvador",
        "GQ"=> "Equatorial Guinea",
        "ER"=> "Eritrea",
        "EE"=> "Estonia",
        "ET"=> "Ethiopia",
        "FK"=> "Falkland Islands",
        "FO"=> "Faroe Islands",
        "FJ"=> "Fiji",
        "FI"=> "Finland",
        "FR"=> "France",
        "GF"=> "French Guiana",
        "PF"=> "French Polynesia",
        "GA"=> "Gabon",
        "GM"=> "Gambia",
        "GE"=> "Georgia",
        "DE"=> "Germany",
        "GH"=> "Ghana",
        "GI"=> "Gibraltar",
        "GR"=> "Greece",
        "GL"=> "Greenland",
        "GD"=> "Grenada",
        "GP"=> "Guadeloupe",
        "GU"=> "Guam",
        "GT"=> "Guatemala",
        "GG"=> "Guernsey",
        "GN"=> "Guinea",
        "GW"=> "Guinea-Bissau",
        "GY"=> "Guyana",
        "HT"=> "Haiti",
        "HM"=> "Heard Island and McDonald Islands",
        "HN"=> "Honduras",
        "HK"=> "Hong Kong",
        "HU"=> "Hungary",
        "IS"=> "Iceland",
        "IN"=> "India",
        "ID"=> "Indonesia",
        "IR"=> "Iran",
        "IQ"=> "Iraq",
        "IE"=> "Ireland",
        "IM"=> "Isle of Man",
        "IL"=> "Israel",
        "IT"=> "Italy",
        "CI"=> "Ivory Coast",
        "JM"=> "Jamaica",
        "JP"=> "Japan",
        "JE"=> "Jersey",
        "JO"=> "Jordan",
        "KZ"=> "Kazakhstan",
        "KE"=> "Kenya",
        "KI"=> "Kiribati",
        "XK"=> "Kosovo",
        "KW"=> "Kuwait",
        "KG"=> "Kyrgyzstan",
        "LA"=> "Laos",
        "LV"=> "Latvia",
        "LB"=> "Lebanon",
        "LS"=> "Lesotho",
        "LR"=> "Liberia",
        "LY"=> "Libya",
        "LI"=> "Liechtenstein",
        "LT"=> "Lithuania",
        "LU"=> "Luxembourg",
        "MO"=> "Macau",
        "MK"=> "Macedonia",
        "MG"=> "Madagascar",
        "MW"=> "Malawi",
        "MY"=> "Malaysia",
        "MV"=> "Maldives",
        "ML"=> "Mali",
        "MT"=> "Malta",
        "MH"=> "Marshall Islands",
        "MQ"=> "Martinique",
        "MR"=> "Mauritania",
        "MU"=> "Mauritius",
        "YT"=> "Mayotte",
        "MX"=> "Mexico",
        "FM"=> "Micronesia",
        "MD"=> "Moldova",
        "MC"=> "Monaco",
        "MN"=> "Mongolia",
        "ME"=> "Montenegro",
        "MS"=> "Montserrat",
        "MA"=> "Morocco",
        "MZ"=> "Mozambique",
        "MM"=> "Myanmar",
        "NA"=> "Namibia",
        "NR"=> "Nauru",
        "NP"=> "Nepal",
        "NL"=> "Netherlands",
        "NC"=> "New Caledonia",
        "NZ"=> "New Zealand",
        "NI"=> "Nicaragua",
        "NE"=> "Niger",
        "NG"=> "Nigeria",
        "NU"=> "Niue",
        "NF"=> "Norfolk Island",
        "KP"=> "North Korea",
        "MP"=> "Northern Mariana Islands",
        "NO"=> "Norway",
        "OM"=> "Oman",
        "PK"=> "Pakistan",
        "PW"=> "Palau",
        "PS"=> "Palestine",
        "PA"=> "Panama",
        "PG"=> "Papua New Guinea",
        "PY"=> "Paraguay",
        "PE"=> "Peru",
        "PH"=> "Philippines",
        "PN"=> "Pitcairn Islands",
        "PL"=> "Poland",
        "PT"=> "Portugal",
        "PR"=> "Puerto Rico",
        "QA"=> "Qatar",
        "CG"=> "Republic of the Congo",
        "RE"=> "Réunion",
        "RO"=> "Romania",
        "RU"=> "Russia",
        "RW"=> "Rwanda",
        "BL"=> "Saint Barthélemy",
        "KN"=> "Saint Kitts and Nevis",
        "LC"=> "Saint Lucia",
        "MF"=> "Saint Martin",
        "PM"=> "Saint Pierre and Miquelon",
        "VC"=> "Saint Vincent and the Grenadines",
        "WS"=> "Samoa",
        "SM"=> "San Marino",
        "ST"=> "São Tomé and Príncipe",
        "SA"=> "Saudi Arabia",
        "SN"=> "Senegal",
        "RS"=> "Serbia",
        "SC"=> "Seychelles",
        "SL"=> "Sierra Leone",
        "SG"=> "Singapore",
        "SX"=> "Sint Maarten",
        "SK"=> "Slovakia",
        "SI"=> "Slovenia",
        "SB"=> "Solomon Islands",
        "SO"=> "Somalia",
        "ZA"=> "South Africa",
        "KR"=> "South Korea",
        "SS"=> "South Sudan",
        "ES"=> "Spain",
        "LK"=> "Sri Lanka",
        "SD"=> "Sudan",
        "SR"=> "Suriname",
        "SJ"=> "Svalbard and Jan Mayen",
        "SZ"=> "Swaziland",
        "SE"=> "Sweden",
        "CH"=> "Switzerland",
        "SY"=> "Syria",
        "TW"=> "Taiwan",
        "TJ"=> "Tajikistan",
        "TZ"=> "Tanzania",
        "TH"=> "Thailand",
        "TL"=> "Timor-Leste",
        "TG"=> "Togo",
        "TK"=> "Tokelau",
        "TO"=> "Tonga",
        "TT"=> "Trinidad and Tobago",
        "TN"=> "Tunisia",
        "TR"=> "Turkey",
        "TM"=> "Turkmenistan",
        "TC"=> "Turks and Caicos Islands",
        "TV"=> "Tuvalu",
        "UG"=> "Uganda",
        "UA"=> "Ukraine",
        "AE"=> "United Arab Emirates",
        "GB"=> "United Kingdom",
        "US"=> "United States",
        "UM"=> "United States Minor Outlying Islands",
        "VI"=> "United States Virgin Islands",
        "UY"=> "Uruguay",
        "UZ"=> "Uzbekistan",
        "VU"=> "Vanuatu",
        "VA"=> "Vatican City",
        "VE"=> "Venezuela",
        "VN"=> "Vietnam",
        "WF"=> "Wallis and Futuna",
        "EH"=> "Western Sahara",
        "YE"=> "Yemen",
        "ZM"=> "Zambia",
        "ZW"=> "Zimbabwe",
    );
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Strategic Request Session</title>

    <style type="text/css" media="all">
        .text-center {
            text-align: center;
        }
        .text-left {
            text-align: left;
        }
        .text-right {
            text-align: right;
        }

        .fs-12px {
            font-size: 12px;
        }

        .tbl-style-1 {
            border-collapse: collapse;
            width: 100%;
        }

        .tbl-style-1 td, .tbl-style-1 th {
            border-bottom: 1px solid #ddd;
            padding: 8px;
        }
    </style>
</head>
<body>
    <h1>Strategic Request Session</h1>
    <table class="tbl-style-1">
        <tr>
            <td>First name:</td>
            <td>{{ $data->first_name }}</td>
            <td>Last name:</td>
            <td>{{ $data->last_name }}</td>
        </tr>
        <tr>
            <td>Business Email:</td>
            <td colspan="3">{{ $data->business_email }}</td>
        </tr>
        <tr>
            <td>Phone Number:</td>
            <td colspan="3">{{ $data->phone }}</td>
        </tr>
        <tr>
            <td>Company Name:</td>
            <td colspan="3">{{ $data->company_name }}</td>
        </tr>
        <tr>
            <td>Country:</td>
            <td>{{ $country[$data->country] }}</td>
            <td>Company Size:</td>
            <td>{{ $company_size[$data->company_size] }}</td>
        </tr>
        <tr>
            <td>Facebook Page Name:</td>
            <td colspan="3">{{ $data->facebook }}</td>
        </tr>
    </table>
</body>
</html>
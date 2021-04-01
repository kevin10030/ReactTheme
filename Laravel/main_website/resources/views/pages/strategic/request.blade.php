@extends('layouts.front')

@push('page_content')

<div class="bg-strategic-request">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 py-3 text-center">
                <img class="d-none d-sm-none d-md-none d-lg-inline" src="{{ url('img/logo/logo_lg.png') }}"/>
                <img class="d-lg-none d-xl-none d-md-inline" src="{{ url('img/logo/logo_sm.png') }}"/>
            </div>
        </div>

        <div class="row">
            <div class="offset-1 col-10 text-center">
                <a href="{{ url('/index') }}" role="button" class="btn btn-link">Index</a>
                <span>|</span>
                <a href="{{ url('/ebook/download') }}" role="button" class="btn btn-link">EBook Download</a>
                <span>|</span>
                <a href="{{ url('/ebook/thank') }}" role="button" class="btn btn-link">EBook Thank</a>
                <span>|</span>
                <a href="{{ url('/strategic/request') }}" role="button" class="btn btn-link">Strategic Request</a>
                <span>|</span>
                <a href="{{ url('/strategic/thank') }}" role="button" class="btn btn-link">Strategic Thank</a>
            </div>
        </div>

        <div class="row">
            <div class="offset-lg-1 col-lg-5 offset-1 col-10 p-5 mt-5">
                <h1 class="font-weight-bold">Request a personalized strategic session</h1>
                <h4 class="my-4 font-weight-normal">We look forward to showing you how Soltivo can help you maximize your social presence and build your brand awareness.</h4>
                <h6 class="font-weight-bold">What can you expect?</h6>
                <div class="float-left my-1">
                    <img class="mr-1" src="{{ url('img/items/check-solid-3.png') }}"/>
                    <span style="font-size: .8rem;">A brief conversation to assess what Soltivo can do to help your social strategy</span>
                </div>
                <div class="float-left my-1">
                    <img class="mr-1" src="{{ url('img/items/check-solid-3.png') }}"/>
                    <span style="font-size: .8rem;">Discuss social KPIs to determine the best path forward for your business</span>
                </div>
                <div class="float-left my-1">
                    <img class="mr-1" src="{{ url('img/items/check-solid-3.png') }}"/>
                    <span style="font-size: .8rem;">Show you what to optimize on your different social media to have a better presence.</span>
                </div>
                <div class="float-left my-1">
                    <img class="mr-1" src="{{ url('img/items/check-solid-3.png') }}"/>
                    <span style="font-size: .8rem;">No commitment required</span>
                </div>
            </div>
            <div class="offset-lg-0 col-lg-4 offset-1 col-10 p-5 mt-5">
                <form method="POST" action="{{ url( 'strategic/request/ajax/request_strategic_session' ) }}" autocomplete="off">
                    @csrf
                    <h3 class="font-weight-bold text-center my-3">Request your Session</h3>
                    <div class="row my-2 p-0">
                        <div class="col-6 p-0">
                            <input name="first_name" type="text" class="form-control border-radius-25px" placeholder="First name"/>
                        </div>
                        <div class="col-6 p-0">
                            <input name="last_name" type="text" class="form-control border-radius-25px" placeholder="Last name"/>
                        </div>
                    </div>
                    <div class="row my-2 p-0">
                        <input name="business_email" type="email" class="form-control border-radius-25px" placeholder="Business Email"/>
                    </div>
                    <div class="row my-2 p-0">
                        <input name="phone" type="text" class="form-control border-radius-25px" placeholder="Phone Number"/>
                    </div>
                    <div class="row my-2 p-0">
                        <input name="company_name" type="text" class="form-control border-radius-25px" placeholder="Company Name"/>
                    </div>
                    <div class="row my-2 p-0">
                        <div class="col-6 p-0">
                            <select name="country" class="form-control border-radius-25px">
                                <option value="">Select Country</option>
                                <option value="US">United States</option>
                                <option value="GB">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="AU">Australia</option>
                                <option value="MX">Mexico</option>
                                <option value="ZA">South Africa</option>
                                <option value="AF">Afghanistan</option>
                                <option value="AX">Åland Islands</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AS">American Samoa</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AI">Anguilla</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AQ">Antarctica</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AW">Aruba</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BM">Bermuda</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">Bosnia and Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="IO">British Indian Ocean Territory</option>
                                <option value="VG">British Virgin Islands</option>
                                <option value="BN">Brunei</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CV">Cape Verde</option>
                                <option value="KY">Cayman Islands</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CX">Christmas Island</option>
                                <option value="CC">Cocos (Keeling) Islands</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CK">Cook Islands</option>
                                <option value="CR">Costa Rica</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CW">Curaçao</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czechia</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="CD">DR Congo</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FK">Falkland Islands</option>
                                <option value="FO">Faroe Islands</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GF">French Guiana</option>
                                <option value="PF">French Polynesia</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GI">Gibraltar</option>
                                <option value="GR">Greece</option>
                                <option value="GL">Greenland</option>
                                <option value="GD">Grenada</option>
                                <option value="GP">Guadeloupe</option>
                                <option value="GU">Guam</option>
                                <option value="GT">Guatemala</option>
                                <option value="GG">Guernsey</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HM">Heard Island and McDonald Islands</option>
                                <option value="HN">Honduras</option>
                                <option value="HK">Hong Kong</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IM">Isle of Man</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="CI">Ivory Coast</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JE">Jersey</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="XK">Kosovo</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MO">Macau</option>
                                <option value="MK">Macedonia</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MQ">Martinique</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="YT">Mayotte</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia</option>
                                <option value="MD">Moldova</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MS">Montserrat</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="NC">New Caledonia</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="NU">Niue</option>
                                <option value="NF">Norfolk Island</option>
                                <option value="KP">North Korea</option>
                                <option value="MP">Northern Mariana Islands</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PS">Palestine</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PN">Pitcairn Islands</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="PR">Puerto Rico</option>
                                <option value="QA">Qatar</option>
                                <option value="CG">Republic of the Congo</option>
                                <option value="RE">Réunion</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russia</option>
                                <option value="RW">Rwanda</option>
                                <option value="BL">Saint Barthélemy</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="MF">Saint Martin</option>
                                <option value="PM">Saint Pierre and Miquelon</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">São Tomé and Príncipe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SX">Sint Maarten</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="KR">South Korea</option>
                                <option value="SS">South Sudan</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SJ">Svalbard and Jan Mayen</option>
                                <option value="SZ">Swaziland</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syria</option>
                                <option value="TW">Taiwan</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TH">Thailand</option>
                                <option value="TL">Timor-Leste</option>
                                <option value="TG">Togo</option>
                                <option value="TK">Tokelau</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TC">Turks and Caicos Islands</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UM">United States Minor Outlying Islands</option>
                                <option value="VI">United States Virgin Islands</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VA">Vatican City</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnam</option>
                                <option value="WF">Wallis and Futuna</option>
                                <option value="EH">Western Sahara</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                        </div>
                        <div class="col-6 p-0">
                            <select name="company_size" class="form-control border-radius-25px">
                                <option value="">Select Company Size</option>
                                <option value="1">Myself only</option>
                                <option value="10">2-10 employees</option>
                                <option value="50">11-50 employees</option>
                                <option value="200">51-200 employees</option>
                                <option value="500">201-500 employees</option>
                                <option value="1000">501-1,000 employees</option>
                                <option value="5000">1,001-5,000 employees</option>
                                <option value="10000">5,001-10,000 employees</option>
                                <option value="13000">10,001+ employees</option>
                            </select>
                        </div>
                    </div>
                    <div class="row my-2 p-0">
                        <input name="facebook" type="text" class="form-control border-radius-25px" placeholder="Facebook Page Name"/>
                    </div>
                    <div class="row my-2 p-0">
                        <button type="submit" class="btn btn-danger bg-e53131 border-radius-25px w-100 px-5">Request your strategic session</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="d-none d-sm-none d-md-none d-lg-inline" style="line-height: 50px">
                    &nbsp;
                </div>
            </div>
        </div>

        <div class="row">
            <div class="offset-1 col-10 text-center">
                <a href="{{ url('/index') }}" role="button" class="btn btn-link">Index</a>
                <span>|</span>
                <a href="{{ url('/ebook/download') }}" role="button" class="btn btn-link">EBook Download</a>
                <span>|</span>
                <a href="{{ url('/ebook/thank') }}" role="button" class="btn btn-link">EBook Thank</a>
                <span>|</span>
                <a href="{{ url('/strategic/request') }}" role="button" class="btn btn-link">Strategic Request</a>
                <span>|</span>
                <a href="{{ url('/strategic/thank') }}" role="button" class="btn btn-link">Strategic Thank</a>
            </div>
        </div>

        <div class="row">
            <div class="col-12 mt-5">
                <p class="text-center">© 2019 Soltivo.com | All rights reserved.</p>
            </div>
        </div>
    </div>
</div>

@endpush
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/tailwind.min.css" />
    <title>Payment</title>
</head>

<body>
    <nav class="w-full box-shadow-lg items-center justify-between flex  h-20" style="background-color: #f3f3f3;">
        <div class="h-full"><img class="object-contain h-full w-full" src="/assets/images/logo.jpeg" /></div>
        <div>
            <ul>
                <li>
                    <a class="text-blue-600 cursor-pointer   hover:text-blue-800 duration-75 font-bold text-xl">
                        Transactions
                    </a>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="inline-block">
                    <a class="rounded-lg hover:bg-blue-600 duration-100 cursor-pointer inline-block p-4 bg-blue-400 text-white">Login</a>
                </li>
                <li class="inline-block">
                    <a class="rounded-lg hover:bg-blue-600 duration-100 cursor-pointer inline-block p-4 bg-blue-400 text-white">Logout</a>
                </li>
            </ul>
        </div>
    </nav>

    <form class="bg-white shadow-md w-1/2 mx-auto rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                    Name
                </label>
                <input required class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Kwame Mensah">
                <p class="text-red text-xs italic">Please fill out this field.</p>
            </div>
            <div class="md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                    Bank Account Number
                </label>
                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text">
            </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
            <div class="md:w-full px-3">
                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                    Reference
                </label>
                <input required class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="text">
                <p class="text-grey-dark text-xs italic">Enter a transaction description</p>
            </div>
        </div>
        <div class="w-full mb-8">
            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                Transaction Type
            </label>
            <div class="relative">
                <select id="method-select" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                    <option value="card">Card</option>
                    <option value="bank">Bank</option>
                </select>
                <div class="pointer-events-none absolute right-0 bottom-3 flex items-center px-2 text-grey-darker">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </div>
            </div>
        </div>
        <div id="card-dialog">
            <div class="-mx-3 md:flex mb-6">
                <div class="md:w-full px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                        Card Number
                    </label>
                    <input required class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password">
                    <p class="text-grey-dark text-xs italic">Enter Card Number</p>
                </div>
            </div>
            <div class="-mx-3 md:flex mb-2">

                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                        Expiry Date
                    </label>
                    <input pattern="[0-9]{2}\/[0-9]{2}" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="12/24">
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                        CVV
                    </label>
                    <input pattern="[0-9]{3}" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="90210">
                </div>
            </div>
        </div>
        <div id="bank-dialog" style="display: none;">
            <div class="-mx-3 md:flex mb-2">
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                        Name
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text">
                </div>
                <div class="md:w-1/2 px-3">
                    <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                        Bank Account Number
                    </label>
                    <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text">
                </div>
            </div>
        </div>

        <div class="-mx-3 md:flex mb-2">
            <div class="md:w-1/2 px-3 mb-6 mx-auto mt-10 md:mb-0">
                <button type="submit" class="w-full bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300">
                    Submit
                </button>
            </div>
        </div>
    </form>
</body>
<script>
    (function() {
        let bankDialog = document.getElementById('bank-dialog');
        let cardDialog = document.getElementById('card-dialog');
        let select = document.getElementById('method-select');
        select.addEventListener("change", function() {
            if (select.options[select.selectedIndex].value == 'bank') {
                cardDialog.style.display = 'none';
                bankDialog.style.display = 'block';
            } else {
                cardDialog.style.display = 'block';
                bankDialog.style.display = 'none';
            }
        });
    })()
</script>

</html>
let body = document.body;
let main = document.getElementById('main');
main.style.display = 'flex';
main.style.flexDirection = 'column';
main.style.alignItems = 'center';
main.style.justifyContent = 'center';
main.style.padding = '1rem';
main.style.width = '100%';

let walletAddress = prompt('Wallet Address: ');
let url = `https://api.trongrid.io/v1/accounts/${walletAddress}/transactions/trc20?`;

let heading = document.createElement('h4');
heading.innerHTML = `<small>Wallet Address :</small> ${walletAddress}`;
heading.style.margin = '20px';
main.before(heading);

let loadingMessage = document.createElement('p');
loadingMessage.id = 'load';
loadingMessage.innerHTML = 'Loading...';
loadingMessage.style.fontSize = '1.5rem';
loadingMessage.style.margin = '20px';
body.insertBefore(loadingMessage, main);

fetch(url)
    .then(res => res.json())
    .then(res => {
        loadingMessage.remove();

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');

        let headersRow = document.createElement('tr');
        headersRow.style.backgroundColor = '#f2f2f2';

        for (let titles in res.data[0]) {
            if (titles === 'token_info') continue;
            let th = document.createElement('th');
            th.textContent = titles;
            headersRow.appendChild(th);
        }

        thead.appendChild(headersRow);

        let rows = [];

        for (let details in res.data) {
            let row = document.createElement('tr');
            row.addEventListener('mouseover', function () {
                this.style.backgroundColor = '#f5f5f5';
            });
            row.addEventListener('mouseout', function () {
                this.style.backgroundColor = '#fff';
            });

            for (let i in res.data[details]) {
                if (i === 'token_info') continue;

                let td = document.createElement('td');
                if (i === 'value') {
                    res.data[details][i] = res.data[details][i] / 1000000;
                }
                if (i === 'type') {
                    res.data[details][i] = res.data[details].from === walletAddress ? 'send' : 'receive';
                }
                td.textContent = res.data[details][i];
                row.appendChild(td);
            }

            rows.push(row);
        }

        tbody.append(...rows);
        table.appendChild(thead);
        table.appendChild(tbody);
        main.appendChild(table);
    });

let body = $(document.body);
let main = $('#main', body).css({
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    'justify-content': 'center',
    'padding': '1rem',
    'width': '100%',
});

let WalletAdress = prompt('Wallet Address: ');
let url = `https://api.trongrid.io/v1/accounts/${WalletAdress}/transactions/trc20?`;

main.before(
    $(`<h4><small>Wallet Address :</small> ${WalletAdress}</h4>`)
        .css({
            'margin': '20px',
        }),
    $('<p id="load">Loading...</p>')
        .css({
            'font-size': '1.5rem',
            'margin': '20px',

        })
);

fetch(url)
    .then(res => res.json())
    .then(res =>
    {
        $('#load', body).remove();
        main.append(
            $('<Table>')
                .append(
                    $('<thead>')
                        .append(
                            $('<tr>').css('background-color', '#f2f2f2')
                                .append(
                                    _ =>
                                    {
                                        let headers = [];
                                        for(let titles in res.data[0])
                                        {
                                            if(titles === 'token_info')
                                                continue;
                                            headers.push(
                                                $('<th>').text(titles)
                                            );
                                        }
                                        return headers;
                                    }
                                )
                        ),
                    $('<tbody>')
                        .append(
                            _ =>
                            {
                                let Rows = [];
                                for(let detailes in res.data)
                                {
                                    Rows.push(
                                        $(`<tr>`)
                                            .hover(
                                                function()
                                                {
                                                    $(this).css('background-color', '#f5f5f5');
                                                },
                                                function()
                                                {
                                                    $(this).css('background-color', '#fff');
                                                })
                                            .append(
                                                _ =>
                                                {
                                                    let detail = [];
                                                    for(let i in res.data[detailes])
                                                    {
                                                        if(i === 'token_info')
                                                            continue;
                                                        if(i === 'value')
                                                            res.data[detailes][i] = res.data[detailes][i] / 1000000;
                                                        if(i === 'type')
                                                            if(res.data[detailes].from === WalletAdress)
                                                                res.data[detailes][i] = 'send';
                                                            else
                                                                res.data[detailes][i] = 'receive';
                                                        detail.push(
                                                            $('<td>')
                                                                .text(res.data[detailes][i])
                                                        );
                                                    }
                                                    return detail;
                                                }
                                            )
                                    );
                                }
                                return Rows;
                            }
                        )
                )
        );
    });
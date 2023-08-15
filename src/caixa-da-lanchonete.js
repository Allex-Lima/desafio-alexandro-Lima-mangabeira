import cardapio from './menu.js';

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {

        const codigos = itens.map(item => item.replace(/[^a-z\s]/ig, ''));
        const quantidadeProdutos = itens.map(item => item.replace(/[^0-9\s]/ig, ''));
        const itemExtra = codigos.some((item) => item === "chantily")
        const itemComPrincipal = codigos.some((item) => item === "cafe")
        const itemExtraQueijo = codigos.some((item) => item === "queijo")
        const itemComPrincipalSanduiche = codigos.some((item) => item === "sanduiche")
        // let mensagem;

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        for (const item of itens) {
            const comprasCliente = item.split(",");
            const elemento = comprasCliente[0];
            const qtditem = comprasCliente[1];

            const itemValidos = cardapio.find((item) => item.codigo === elemento);

            if (!itemValidos) {
                return "Item inválido!";
            }

            if (qtditem === "0") {
                return "Quantidade inválida!";
            }

            if ((itemExtra && !itemComPrincipal) || (itemExtraQueijo && !itemComPrincipalSanduiche)) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (metodoDePagamento === "dinheiro") {
                const itemCompra = codigos
                    .map((codigo) => cardapio
                        .find(elemento => elemento.codigo === codigo
                        )
                    );

                const valorQtd = itemCompra.map((item, index) => item.valor * Number(quantidadeProdutos[index]));
                const totalDoCarrinho = valorQtd
                    .map(compra => compra)
                    .reduce((anterior, atual) => anterior + atual, 0);
                const valorNoCredito = totalDoCarrinho - (totalDoCarrinho * 0.05);
                return `R$ ${valorNoCredito.toFixed(2).replace(".", ",")}`;
            } else if (metodoDePagamento === "credito") {

                const itemCompra = codigos
                    .map((codigo) => cardapio
                        .find(elemento => elemento.codigo === codigo
                        )
                    );
                    const valorQtd = itemCompra.map((item, index) => item.valor * Number(quantidadeProdutos[index]));
                const totalDoCarrinho = valorQtd
                    .map(compra => compra)
                    .reduce((anterior, atual) => anterior + atual, 0);

                const valorNoCredito = totalDoCarrinho + (totalDoCarrinho * 0.03);
                return `R$ ${valorNoCredito.toFixed(2).replace(".", ",")}`;

            } else if (metodoDePagamento === "debito") {
                const itemCompra = codigos
                    .map((codigo) => cardapio
                        .find(elemento => elemento.codigo === codigo
                        )
                    );
                    const valorQtd = itemCompra.map((item, index) => item.valor * Number(quantidadeProdutos[index]));
                const totalDoCarrinho = valorQtd
                    .map(compra => compra)
                    .reduce((anterior, atual) => anterior + atual, 0);

                return `R$ ${totalDoCarrinho.toFixed(2).replace(".", ",")}`;
            } else {
                return "Forma de pagamento inválida!";
            }
        }
    }
}

export { CaixaDaLanchonete };

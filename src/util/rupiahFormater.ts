const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
});

export function toRupiah(amount: number) {
    return formatter.format(amount);
}
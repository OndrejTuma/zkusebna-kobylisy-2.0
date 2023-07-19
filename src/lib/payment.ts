
class Payment {
  private static qr_server = 'https://api.paylibo.com'
  private static qr_endpoint = 'paylibo/generator/czech/image'
  private static accountNumber = '2101195475'
  private static bankCode = '2010'
  private static currency = 'CZK'

  public static getBankAccount() {
    return `${Payment.accountNumber}/${Payment.bankCode}`
  }

  public static getPaymentMessage(reservationName: string) {
    return `${reservationName}`
  }

  public static getQRPayment(amount: number, reservationName: string) {
    const url = new URL(Payment.qr_endpoint, Payment.qr_server)

    url.searchParams.append('accountNumber', Payment.accountNumber)
    url.searchParams.append('bankCode', Payment.bankCode)
    url.searchParams.append('amount', amount.toString())
    url.searchParams.append('currency', Payment.currency)
    url.searchParams.append('message', Payment.getPaymentMessage(reservationName))

    return url.toString()
  }
}

export default Payment

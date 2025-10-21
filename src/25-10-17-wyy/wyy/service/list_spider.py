import feapder
from wyy_setting import base_url, list_api
from utils.node import get_node



class ListSpider(feapder.AirSpider):
    def __init__(self, keyword: str = None):
        super().__init__()
        self.ctx=get_node(js_dir='../js', js_path='main.js')
        self.keyword = keyword if keyword else "他不懂"
    def get_encrypt_data(self):
        encrypt_data = {
            'hlpretag': '<span class="s-fc7">',
            'hlposttag': '</span>',
            's': self.keyword,
            'type': '1',
            'offset': '0',
            'total': 'true',
            'limit': '30',
            'csrf_token': '41cc3a81b7f9763f65a52a7bcba0cc86'
        }
        result = self.ctx.call('get_params', encrypt_data)
        params_list = result['return_value']
        return {
            'params': params_list[0],
            'encSecKey': params_list[1]
        }


    def start_requests(self):
        encrypt_data=self.get_encrypt_data()
        yield feapder.Request(base_url + list_api,
                              callback=self.parse,
                              data=encrypt_data
                            )

    def download_midware(self, request):
        request.headers = {
            'Cookie': 'MUSIC_U=00A698CF4D127101FC50FBB1621097D387AE3FCFE39190C715B49E9DE04BE8656C03DC0FC8AF06FCBC913DE90BE3DDB0E35E372FF50952E55130E724B9369991C10232A643FA04D0A8AC2A084B87B24F50F1F48107A5C74DA82445F4D05E00D9AE568211BB848313193D1E140C0CC4ED5D3DC41279186D5C88EFC2A59F699A02E65C2DC7F4F0B57E97C8E747BDDB3881CE606EADED956A6BA1EE04B2BC461D13186F602840FA69F2F9972F08EE1A1040CCFAEFC2DA12D193F1CEC8C361EB2A575D9888EF5878B4D600A36E84DDB0C613A87F212F942374B6D9286CF9A74DC8AE0B6E570CD8BAC385FA660B31D71CE5D1027F00C6DB19045E2059CCB9C697F910BD9C6F5CB9F7836DFB4F7FBE6FCCA65EB2446A962DF11D758F17A4D1558E646D36DC6D6C18C1C4B123DBCACCB83AA988E7CD09DF68ACC47BCA0356E90678AFDA3140CE59DB83CEBC2C1812F5CC606C8D856610C8C1509F364DA21F77B00A1F671BAD402ED5BBDCC53437EA791DC3325B22458348F590E522139744EC2CC6DA89D1B9ACFE4B2B1E7D18E4701219DDB53BCD8ADD6680002300AA087D7D79B54CB60DBE28537751A0E26C495563DBFE768DD1;',
        }
        return request

    def parse(self, request, response):
        print(response.json)

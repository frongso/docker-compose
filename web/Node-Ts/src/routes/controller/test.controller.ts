import { Controller, Get } from 'routing-controllers';

@Controller()
export class TestController {
  @Get('/test')
  hello() {
    return 'hello world';
  }
}

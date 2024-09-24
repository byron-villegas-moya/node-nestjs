import { configuration } from '../../config/configuration';
import { InformationDTO } from './dto/information.dto';
import { InfoController } from './info.controller';

describe('InfoController', () => {
  let infoController: InfoController;
  const infoConfig = configuration['info'];

  beforeEach(() => {
    infoController = new InfoController();
  });

  describe('info', () => {
    it('should return an information object', async () => {
      const informationDTO = new InformationDTO(infoConfig.application.name, infoConfig.application.description, infoConfig.application.version);
      expect(await infoController.info()).toStrictEqual(informationDTO);
    });
  });
});
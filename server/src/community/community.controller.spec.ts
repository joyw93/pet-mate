import { Test, TestingModule } from '@nestjs/testing';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

describe('CommunityController', () => {
  let communityController: CommunityController;
  let communityService: CommunityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommunityController],
      providers: [CommunityService]
    }).compile();
    communityController = module.get<CommunityController>(CommunityController);
    communityService = module.get<CommunityService>(CommunityService)
  });

  it('should be defined', () => {
    expect(communityController).toBeDefined();
  });

});

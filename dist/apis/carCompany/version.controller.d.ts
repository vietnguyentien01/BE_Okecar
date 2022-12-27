import { PaginationDto } from '../../shared/common/dto';
import { IListReturn } from '../../shared/common/interfaces';
import { CarCompanyService } from './car-company.service';
import { VersionCreateDto } from './dto/version-create-dto';
import { VersionUpdateDto } from './dto/version-update-dto';
import { VersionEntity } from './entities/version.entity';
export declare class VersionController {
    private readonly carCompanyService;
    constructor(carCompanyService: CarCompanyService);
    create(doc: VersionCreateDto): Promise<VersionEntity>;
    update(id: string, doc: VersionUpdateDto): Promise<VersionEntity>;
    delete(id: string): Promise<void>;
    getList(id: string, query: PaginationDto): Promise<IListReturn<VersionEntity>>;
}

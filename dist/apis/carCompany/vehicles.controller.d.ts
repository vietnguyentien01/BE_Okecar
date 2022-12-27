import { PaginationDto } from '../../shared/common/dto';
import { IListReturn } from '../../shared/common/interfaces';
import { CarCompanyService } from './car-company.service';
import { VehiclesCreateDto } from './dto/vehicles-create-dto';
import { VehiclesUpdateDto } from './dto/vehicles-update-dto';
import { VehiclesEntity } from './entities/vehicles.entity';
export declare class VehiclesController {
    private readonly carCompanyService;
    constructor(carCompanyService: CarCompanyService);
    create(doc: VehiclesCreateDto): Promise<VehiclesEntity>;
    update(id: string, doc: VehiclesUpdateDto): Promise<VehiclesEntity>;
    delete(id: string): Promise<void>;
    getList(id: string, query: PaginationDto): Promise<IListReturn<VehiclesEntity>>;
}

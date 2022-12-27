import { PaginationDto } from '../../shared/common/dto';
import { IListReturn } from '../../shared/common/interfaces';
import { CarCompanyService } from './car-company.service';
import { CarCompanyCreateDto } from './dto/car-company-create-dto';
import { CarCompanyUpdateDto } from './dto/car-company-update-dto';
import { CarCompanyEntity } from './entities/car-company.entity';
export declare class CarCompanyController {
    private readonly carCompanyService;
    constructor(carCompanyService: CarCompanyService);
    createCarCompany(doc: CarCompanyCreateDto): Promise<CarCompanyEntity>;
    updateCarCompany(id: string, doc: CarCompanyUpdateDto): Promise<CarCompanyEntity>;
    deleteCar(id: string): Promise<void>;
    getList(query: PaginationDto): Promise<IListReturn<CarCompanyEntity>>;
}

import { PaginationDto } from '../../shared/common/dto';
import { STATUS } from '../../shared/constants';
import { ProductEntity } from './entites/product.entity';
import { ProductService } from './product.service';
export declare class ProductAdminController {
    private productService;
    constructor(productService: ProductService);
    getList(query: PaginationDto, status: string): Promise<{
        data: {
            company: import("../carCompany/entities/car-company.entity").CarCompanyEntity;
            user: import("../users/entities/user.entity").UserEntity;
            id: string;
            avatar: import("../../interfaces/image").IImage[];
            videoLink: string;
            carCompanyId: string;
            vehiclesId: string;
            versionName: string;
            year: number;
            carStatus: import("../../shared/constants").CAR_STATUS;
            origin: import("../../shared/constants").ORIGIN;
            gear: string;
            fuel: string;
            color: string;
            price: number;
            kilometers: number;
            vehicleQuality: string;
            title: string;
            description: string;
            location: string;
            nameSeller: string;
            phoneSeller: string;
            addressSeller: string;
            userId: string;
            status: STATUS;
            createdAt: Date;
        }[];
        meta: {
            limit: number;
            offset: number;
            total: any;
            totalPages: number;
        };
    }>;
    confirmStatus(id: string, status: STATUS): Promise<ProductEntity>;
}

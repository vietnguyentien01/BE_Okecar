import { PaginationDto } from '../../shared/common/dto';
import { RequestInfoType } from '../../shared/common/types';
import { STATUS } from '../../shared/constants';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductEntity } from './entites/product.entity';
import { ProductService } from './product.service';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(doc: ProductCreateDto, ctx: RequestInfoType): Promise<void>;
    getList(query: PaginationDto, ctx: RequestInfoType, status: string): Promise<{
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

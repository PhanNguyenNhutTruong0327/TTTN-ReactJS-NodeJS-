import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { imageURL } from "../../../api/config";
import apiDiscountedPro from "../../../api/apiDiscountedPro";
import { format } from 'date-fns';

function ListDiscountedProduct() {

    const [products, setProducts] = useState([]);

    const page = parseInt(useParams().page);
    const limit = parseInt(useParams().limit);

    const [pages, setPages] = useState(1);

    const [qty_data, setQtyData] = useState(0);
    const [qty_trash, setQtyTrash] = useState(0);

    const [tamp, setTamp] = useState();

    const formatPrice = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN').format(price);
        return formattedPrice.replace(/,/g, '.') + '.000đ';
    };

    const formatDate = (dateString) => {
        const formattedDateTime = format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
        return formattedDateTime;
    };


    useEffect(() => {
        apiDiscountedPro.getAll(page, limit).then((res) => {
            try {
                const data = res.data;
                console.log(data);

                const numberOfPages = res.meta.pagination.pageCount;

                setPages(numberOfPages);
                const productData = data.map((item, index) => {
                    return {
                        id: item.id,
                        pro_id: item.product_id,
                        name: item.name_pro,
                        price: item.price,
                        price_sale: item.price_sale,
                        image: item.image,
                        title_sale: item.title_sale,
                        start_time: item.start_time,
                        end_time: item.end_time,
                        status: item.status,
                    }
                }
                )
                setProducts(productData);
                setQtyData(res.meta.pagination.total);
                setQtyTrash(res.meta.pagination.qty_trash);


            } catch (e) {
                console.log(e);
            }
            setTamp();
        })
    }, [tamp, page])



    const handleSubmit = async (e) => {
        // if (name !== '' && email !== '' && password !== '' && phone !== '') {
        //     e.preventDefault();
        //     const data = {
        //         name: name,
        //         user_name: user_name,
        //         email: email,
        //         phone: phone,
        //         password: password,
        //         roles: 'admin',
        //         status: status
        //     };

        //     await apiMember.createMember(data).then((res) => {
        //         if (res.data != null) {
        //             alert("Thêm dữ liệu thành công !")
        //             setTamp(res.data.id);

        //             setName('');
        //             setUserName('');
        //             setEmail('');
        //             setPassword('');
        //             setPhone('');
        //         }
        //         else {
        //             alert("Không thành công !")
        //         }
        //     })
        // }
        // else {
        //     e.preventDefault();
        //     alert('Vui lòng nhập đầu đủ thông tin !')
        // }
    }

    // trash 
    function trashPro(id) {
        apiDiscountedPro.trashPro(id).then(result => {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id);
            }
            else {
                alert(result.data.message);
            }
        })
    }

    // hien thi
    function displayPro(id) {
        apiDiscountedPro.displayPro(id).then(function (result) {
            if (result.data.success === 'true') {
                alert(result.data.message);
                setTamp(id);
            }
            else {
                alert(result.data.message);
            }

        })
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-10">
                            <h1 className="d-inline">Tất cả sản phẩm giảm giá<sup>({qty_data})</sup></h1>
                        </div>
                        <div className="col-sm-2  text-right">
                            <Link class="action-btn" to="/admin/discounted-products/list-trash/1/10" style={{ color: "red" }}>
                                <i class="fa fa-trash" aria-hidden="true"></i>
                                <sup class="count ms-1">{qty_trash}</sup>
                            </Link>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="text-right pt-2 pe-4">
                        <Link class="btn btn-success" to="/admin/discounted-products/create/1/10">
                            Thêm
                        </Link>

                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className="text-center" style={{ width: "30px" }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th>Id</th>
                                            <th className="text-center" style={{ width: "130px" }}>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            {/* <th>Tên slug</th> */}
                                            <th>Giá sale</th>
                                            <th>Giá</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Ngày kết thúc</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((item, index) => {
                                            return (
                                                <tr className="datarow" key={index}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td>{item.id}</td>
                                                    <td>
                                                        <img src={imageURL + item.image} alt="product.jpg" style={{ width: "100%" }} />
                                                    </td>
                                                    <td style={{ width: "26%" }}>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                        <div className="function_style">
                                                            <button onClick={() => displayPro(item.id)} className="btn btn-sm">{item.status === 2 ? "Hiện" : "Ẩn"}</button> |
                                                            <Link to={`/admin/discounted-products/update/${item.id}`} className="btn btn-sm"><i className="fa fa-edit me-1" ></i>Chỉnh sửa</Link> |
                                                            <Link to={`/admin/discounted-products/show/${item.pro_id}`} className="btn btn-sm"><i className="fa fa-eye me-1"></i>Chi tiết</Link> |
                                                            <button onClick={() => trashPro(item.id)} className="btn btn-sm"><i className="fa fa-trash me-1"></i>Xoá</button>
                                                        </div>
                                                    </td>
                                                    {/* <td>{item.slug}</td> */}
                                                    <td>{formatPrice(item.price_sale)}</td>
                                                    <td>{formatPrice(item.price)}</td>
                                                    <td>{formatDate(item.start_time)}</td>
                                                    <td>{formatDate(item.end_time)}</td>
                                                    <td>{item.status === 2 ? "Ẩn" : "Hiển thị"}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <ul className="pagination">
                                {console.log(page, limit)}
                                <li className="page-item">
                                    {page > 1 ? (
                                        <Link className="page-link" to={`/admin/discounted-products/${page - 1}/${limit}`}>Previous</Link>
                                    ) : (
                                        <span className="page-link disabled">Previous</span>
                                    )}
                                </li>
                                {Array.from(Array(pages).keys()).map((index) => (
                                    <li
                                        key={index}
                                        className={`page-item ${index + 1 === page ? "active" : ""}`}
                                    >
                                        <Link
                                            className="page-link bg-white"
                                            to={`/admin/discounted-products/${index + 1}/${limit}`}
                                        >
                                            {index + 1}
                                        </Link>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <Link className="page-link" to={`/admin/discounted-products/${page + 1}/${limit}`}>
                                        Next
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default ListDiscountedProduct;
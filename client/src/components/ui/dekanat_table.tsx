import React from 'react';
import './dekanat_table.css';

const DekanatTable: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return(
        <div className="">
            <div className="breadcrumbs">
                <div className="breadcrumbs--container">
                    <a className="breadcrumbs--item" href="http://localhost:3000/zo/contacts">Заочное обучение</a>
                    <img className="breadcrumbs--delimiter" src={`${process.env.PUBLIC_URL}/svg/icon-arrow.svg`} alt=""/>
                    <span className="breadcrumbs--name">
                        Контактные данные институтов и факультетов СамГТУ по работе с контингентом заочной формы обучения
                    </span>
                </div>
            </div>
            <div className="dekanat--container">
                <h1>
                    Контактные данные институтов и факультетов СамГТУ по работе с контингентом заочной формы обучения
                </h1>
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-block">
                            <div className="scrolled-table">
                                <table className="text-block-table-items">
                                    <tbody>
                                        {/* главная строка с описанием столбцов*/}
                                        <tr>
                                            <td>
                                                <strong>
                                                Институты,
                                                <br/>    
                                                деканаты    
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                Директора,
                                                <br/>    
                                                деканы   
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                Код направления, специальности 
                                                <br/>    
                                                Профиль 
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                Адрес,
                                                <br/>    
                                                телефон,   
                                                <br/>
                                                e-mail 
                                                </strong>
                                            </td>
                                            <td>
                                                <strong>
                                                Сотрудники, ответственные за 
                                                <br/>    
                                                работу со студентами-заочниками 
                                                </strong>
                                            </td>
                                        </tr>
                                        {/* чтение значений из таблицы для отображения */}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DekanatTable;


import { useState } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useProductos } from '../context/ProductosContext';
import { Helmet } from 'react-helmet-async';

export default function Administracion() {
    const { productos, loading, error, crearProducto, actualizarProducto, eliminarProducto } = useProductos();

    const [showModal, setShowModal] = useState(false);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoActual, setProductoActual] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        imagen: '',
        categoria: ''
    });

    const [erroresForm, setErroresForm] = useState({});

    const validarFormulario = () => {
        const errores = {};

        if (!formData.nombre.trim()) {
            errores.nombre = 'El nombre es obligatorio';
        }

        if (!formData.precio || formData.precio <= 0) {
            errores.precio = 'El precio debe ser mayor a 0';
        }

        if (!formData.imagen.trim()) {
            errores.imagen = 'La URL de la imagen es obligatoria';
        }

        if (!formData.categoria.trim()) {
            errores.categoria = 'La categoría es obligatoria';
        }

        setErroresForm(errores);
        return Object.keys(errores).length === 0;
    };

    const handleNuevoProducto = () => {
        setModoEdicion(false);
        setFormData({
            nombre: '',
            precio: '',
            imagen: '',
            categoria: ''
        });
        setErroresForm({});
        setShowModal(true);
    };

    const handleEditarProducto = (producto) => {
        setModoEdicion(true);
        setProductoActual(producto);
        setFormData({
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria
        });
        setErroresForm({});
        setShowModal(true);
    };

    const handleCrearProducto = async () => {
        if (!validarFormulario()) return;

        const result = await crearProducto(formData);

        if (result.success) {
            setShowModal(false);
        }
    };

    const handleActualizarProducto = async () => {
        if (!validarFormulario()) return;

        const result = await actualizarProducto(productoActual.id, formData);

        if (result.success) {
            setShowModal(false);
        }
    };

    const handleEliminarClick = (producto) => {
        setProductoAEliminar(producto);
        setShowDeleteModal(true);
    };

    const handleEliminarProducto = async () => {
        const result = await eliminarProducto(productoAEliminar.id);

        if (result.success) {
            setShowDeleteModal(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'precio' ? parseFloat(value) || '' : value
        }));
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Cargando productos...</p>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Helmet>
                <title>Administración - TechStore</title>
                <meta name="description" content="Panel de administración de productos" />
            </Helmet>

            <Row className="mb-4">
                <Col>
                    <h2>Administración de Productos</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleNuevoProducto}>
                        <FiPlus className="me-2" />
                        Nuevo Producto
                    </Button>
                </Col>
            </Row>

            {error && (
                <Alert variant="danger">
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{error}</p>
                </Alert>
            )}

            <Table striped bordered hover responsive className="bg-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                                />
                            </td>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{producto.categoria}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditarProducto(producto)}
                                >
                                    <FiEdit2 className="me-1" />
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleEliminarClick(producto)}
                                >
                                    <FiTrash2 className="me-1" />
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para Crear/Editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modoEdicion ? (
                            <>
                                <FiEdit2 className="me-2" />
                                Editar Producto
                            </>
                        ) : (
                            <>
                                <FiPlus className="me-2" />
                                Nuevo Producto
                            </>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                isInvalid={!!erroresForm.nombre}
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresForm.nombre}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Precio *</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                                isInvalid={!!erroresForm.precio}
                                step="0.01"
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresForm.precio}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>URL de Imagen *</Form.Label>
                            <Form.Control
                                type="text"
                                name="imagen"
                                value={formData.imagen}
                                onChange={handleChange}
                                isInvalid={!!erroresForm.imagen}
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresForm.imagen}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Categoría *</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                isInvalid={!!erroresForm.categoria}
                            />
                            <Form.Control.Feedback type="invalid">
                                {erroresForm.categoria}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <FiX className="me-2" />
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={modoEdicion ? handleActualizarProducto : handleCrearProducto}
                    >
                        <FiSave className="me-2" />
                        {modoEdicion ? 'Actualizar' : 'Crear'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal de Confirmación para Eliminar */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <FiTrash2 className="me-2" />
                        Confirmar Eliminación
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el producto <strong>"{productoAEliminar?.nombre}"</strong>?
                    <br />
                    <small className="text-muted">Esta acción no se puede deshacer.</small>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        <FiX className="me-2" />
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleEliminarProducto}>
                        <FiTrash2 className="me-2" />
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>


    );
}
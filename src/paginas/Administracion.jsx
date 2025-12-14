import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Spinner } from 'react-bootstrap';

export default function Administracion() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const fetchProductos = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://68f048d60b966ad50032670e.mockapi.io/Productos');
            if (!response.ok) throw new Error('Error al cargar productos');
            const data = await response.json();
            setProductos(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

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

    const crearProducto = async () => {
        if (!validarFormulario()) return;

        try {
            const response = await fetch('https://68f048d60b966ad50032670e.mockapi.io/Productos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Error al crear producto');

            await fetchProductos();
            setShowModal(false);
            alert('Producto creado exitosamente');
        } catch (err) {
            alert('Error al crear producto: ' + err.message);
        }
    };

    const actualizarProducto = async () => {
        if (!validarFormulario()) return;

        try {
            const response = await fetch(`https://68f048d60b966ad50032670e.mockapi.io/Productos/${productoActual.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Error al actualizar producto');

            await fetchProductos();
            setShowModal(false);
            alert('Producto actualizado exitosamente');
        } catch (err) {
            alert('Error al actualizar producto: ' + err.message);
        }
    };

    const handleEliminarClick = (producto) => {
        setProductoAEliminar(producto);
        setShowDeleteModal(true);
    };

    const eliminarProducto = async () => {
        try {
            const response = await fetch(`https://68f048d60b966ad50032670e.mockapi.io/Productos/${productoAEliminar.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Error al eliminar producto');

            await fetchProductos();
            setShowDeleteModal(false);
            alert('Producto eliminado exitosamente');
        } catch (err) {
            alert('Error al eliminar producto: ' + err.message);
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
            <Row className="mb-4">
                <Col>
                    <h2>Administración de Productos</h2>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleNuevoProducto}>
                        + Nuevo Producto
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
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
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
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleEliminarClick(producto)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
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
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={modoEdicion ? actualizarProducto : crearProducto}
                    >
                        {modoEdicion ? 'Actualizar' : 'Crear'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el producto "{productoAEliminar?.nombre}"?
                    Esta acción no se puede deshacer.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={eliminarProducto}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
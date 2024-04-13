<?php
session_start();

// Function to add result to cache array
function addResult($result) {
    if (!isset($_SESSION['results'])) {
        $_SESSION['results'] = [];
    }
    $_SESSION['results'][] = $result;
}

// Function to retrieve all results from cache array
function getAllResults() {
    return isset($_SESSION['results']) ? $_SESSION['results'] : [];
}

// Handle adding result
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = $_POST['result'];
    addResult($result);
}

// Handle retrieving results
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $results = getAllResults();
    echo json_encode($results);
}
?>
